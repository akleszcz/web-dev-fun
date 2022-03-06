# The `script` element

## Overview

The HTML `script` element allows us to embed executable code (usually written in JavaScript) or data in HTML documents. The code can be defined either directly between the `<script>` and `</script>` tags, or in a separate file - the file's URL needs to be provided as a value of the `src` attribute then:

> If `src` is specified, it must be a valid non-empty URL potentially surrounded by spaces.

https://html.spec.whatwg.org/multipage/scripting.html#the-script-element

Be default, when a browser's HTML parser encounters a `script` element, it tries to download and execute it before parsing the rest of the document. This may negatively affect user experience. Fortunately, there are two attributes that can be added to `script` elements to change this behaviour:

> The `async` and `defer` attributes are boolean attributes that indicate how the script should be evaluated.
>
> (...)
>
> For classic scripts, if the `async` attribute is present, then the classic script will be fetched in parallel to parsing and evaluated as soon as it is available (potentially before parsing completes). If the `async` attribute is not present but the `defer` attribute is present, then the classic script will be fetched in parallel and evaluated when the page has finished parsing. If neither attribute is present, then the script is fetched and evaluated immediately, blocking parsing until these are both complete.

https://html.spec.whatwg.org/multipage/scripting.html#the-script-element

Additionally:

> Scripts with the `defer` attribute will prevent the `DOMContentLoaded` event from firing until the script has loaded and finished evaluating.
>
> (...)
>
> Scripts with the `defer` attribute will execute in the order in which they appear in the document.

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer

> The `defer` attribute may be specified even if the `async` attribute is specified, to cause legacy Web browsers that only support `defer` (and not `async`) to fall back to the `defer` behavior instead of the synchronous blocking behavior that is the default.

https://www.w3.org/TR/2011/WD-html5-20110525/scripting-1.html#attr-script-async

## Example
In the `section_11_async_defer/examples` directory you will find three HTML files: `index.html`, `index-async.html` and `index-defer.html`. The first one contains the following snippet in its body:
```html
<div>Before scripts</div>
<script src="http://localhost:8081/index1.js"></script>
<script src="http://localhost:8081/index2.js"></script>
<div>After scripts</div>
```
As you can see, there is a `div` element followed by two parser-blocking scripts and another `div` element at the end.

The other two HTML files have a very similar structure. The only difference is that their `script` elements have an `async` or `defer` attribute set, respectively.

In order to start the server that serves the script files, go to the `server` directory that you can find inside of `section_11_async_defer/examples` and run `npm start`. It executes the script in the `section_11_async_defer/examples/server/app.js` file, which creates a simple HTTP server on port 8081. The logic of `app.js` is as follows:
- after receiving a request, read the `url` value of the request object. The value is equal to `/index.js` for a request sent to http://localhost:8081/index1.js and `/some/invalid/path/index.js` for a request to http://localhost:8081/some/invalid/path/index.js,
- if the `url` is equal to `/index1.js`, wait for 5 seconds and then read the `section_11_async_defer/examples/server/index1.js` file and return it in the response,
- similarly, if the `url` is equal to `/index2.js`, return the content of the `section_11_async_defer/examples/server/index2.js` file, but with a 3 second delay,
- in any other case, try to read the file immediately and return an error, since the file doesn't exist.

The scripts - `index1.js` and `index2.js` - do only one thing: they display an alert saying `Hello from index1.js!` and `Hello from index2.js!`, respectively.

### No `async` or `defer`
Now let's go back to the HTML files. Open `index.html` in the browser, with the *Network* tab of the developer tools open (you don't need a server, you can open the document using the `file` protocol). You should observe the following behaviour:
- The text `Before scripts` from the first `div` is displayed immediately,
- both scripts start loading immediately after the page is loaded,
- `index2.js` is loaded after 3 seconds, but the alert saying `Hello from index2.js!` isn't displayed yet,
- `index1.js` finishes loading after 5 seconds (so 2 seconds after `index2.js`) and the `Hello from index1.js!` alert is displayed. When you close it, the second alert from `index2.js` is displayed.
- when you close the second alert, the text `After scripts` appear on the page.

As you can see, the scripts loaded with neither `async` nor `defer` block parsing of the HTML document, so the full content of the page is displayed with a delay.

### `async`
To see the difference when the `async` attribute is used, open `index-async.html`. This time both messages:
```html
Before scripts
After scripts
```
are displayed immediately, while the scripts are still loading. When `index2.js` is loaded after around 3 seconds, we see an alert saying `Hello from index2.js!`, even though the element `<script async src="http://localhost:8081/index2.js"></script>` appears after ` <script async src="http://localhost:8081/index1.js"></script>` in HTML. After two more seconds pass, we see another alert saying `Hello from index1.js!` (assuming that we managed to close the previous alert in the meantime. Otherwise, the second one will appear right after the first one is closed).

This example demonstrates the `async` behaviour described in the [overview](#overview) - the scripts are *fetched in parallel to parsing and evaluated as soon as they are available (potentially before parsing completes)*. In this case parsing completed before scripts execution, but if the scripts loaded faster and there was more HTML to display, the rendering could be blocked until the scripts are executed.

## `defer`
If we open the `index-defer.html` file, we will see that, again, the whole content of the HTML document:
```
Before scripts
After scripts
```
is displayed immediately. However, unlike in the previous case, the alert saying `Hello from index2.js!` is not displayed after 3 seconds. Instead, we have to wait for 5 seconds to see `Hello from index1.js!`. Only after this alert is closed, the second one with `Hello from index2.js!` appears. This proves that deferred scripts are executed in the order in which they appear in the HTML document.

## Both

You can modify one of the HTML files to add both `async` and `defer` attributes to the scripts. You should see that if the HTML file is opened in a browser that supports the `async` tag, then the scripts behave as if only `async` was present (regardless of the order in which the attributes are defined).

## `DOMContentLoaded`

There's also a small script embedded directly within the `head` section of the three HTML documents:
```javascript
<script>
  document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM content loaded!');
  });
</script>
```
The message `DOM content loaded!` is displayed in the console:
- after both alerts are displayed and closed and the whole document is rendered in `index.html`,
- after the whole document is rendered in `index-async.html`, without waiting for the external `async` scripts to be loaded and executed (so without waiting for the alerts),
- after both alerts are displayed and closed in `index-defer.html`, even though the document has been rendered immediately.
