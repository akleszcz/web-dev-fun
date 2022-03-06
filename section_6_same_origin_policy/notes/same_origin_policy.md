# Same Origin Policy

> The same-origin policy is a critical security mechanism that restricts how a document or script loaded by one origin can interact with a resource from another origin.

[Source](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)

## Overview

- a script can read only the properties of windows and documents that have the same origin as the document that contains the script
-  origin of a document is defined as the **protocol**, **host**, and **port** of the URL from which the document was loaded
- it is important to understand that the origin of the script itself is not relevant to the same-origin policy: what matters is the origin of the document in which the script is embedded
- if your script opened a window (from a different origin), your script can close it, but it cannot "look inside" the window in any way.
- The same-origin policy also applies to scripted HTTP requests made with `XMLHttpRequest` or `fetch`

Source: *JavaScript: The Definitive Guide*, 6th Edition, David Flanagan, Chapter 13: JavaScript in Web Browsers, p. 334

## Example - accessing a cross-origin frame
In `section_6_same_origin_policy\examples` you can find two directories: `origin1` and `origin2` and a `package.json` file containig two scripts:
- `start:origin1` - which starts a simple HTTP server that serves files from the `origin1` directory on port 8080,
- `start:origin2` - which starts a simple HTTP server that serves files from the `origin2` directory on port 8081.

Run `npm install` (still in the `section_6_same_origin_policy\examples` directory) to install `http-server`. Then run `npm run start:origin1` to start the first server, open a new terminal window and run `npm run start:origin2` there to start the second server.

Next, navigate to http://localhost:8080/index.html. You will see a heading saying *Hello from http://localhost:8080!* and two buttons: `Open http://localhost:8080/greeting.html` and `Open http://localhost:8081/greeting.html`. When you click the first one, a new window will open with a message: *Greeting from http://localhost:8080!*. When you click the second one, another window will be opened, but with no greeting message this time.

Now let's analyze the code. In `section_6_same_origin_policy\examples\origin1\index.html`, we have an `h1` heading and the two buttons mentioned earlier:
```html
  <h1 id="hello-container"></h1>
  <div id="buttons-container">
    <button id="open-8080">Open http://localhost:8080/greeting.html</button>
    <button id="open-8081">Open http://localhost:8081/greeting.html</button>
  </div>
```

There's also a script tag pointing to a JS file served from `origin2`:
```html
  <script src="http://localhost:8081/main.js"></script>
```

This script file is responsible for filling the heading with *Hello from http://localhost:8080!* and for handling the buttons' click events. If you take a look at the source code in `section_6_same_origin_policy\examples\origin2\main.js`, you will see that when one of the buttons is clicked, the following happens:
- the respective URL (http://localhost:8080/greeting.html or http://localhost:8081/greeting.html) is opened is a new tab,
- the script attempts to access the DOM of the page is has just opened in order to display the greeting.

Accessing the DOM (and therefore displaying the greeting) works for http://localhost:8080/greeting.html, but not for http://localhost:8081/greeting.html.

Additionally, after one of the buttons is clicked, the new window object returned by `window.open(url)` is saved as `window.newWindow` at
http://localhost:8080/index.html. To be more precise, the object returned is a `WindowProxy` object:
> ### Return value
>
> A `WindowProxy` object, which is basically a thin wrapper for the `Windo`w object representing the newly created window, and has all its features available. If the window couldn't be opened, the returned value is instead `null`. The returned reference can be used to access properties and methods of the new window as long as it complies with Same-origin policy security requirements.

[Source](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#return_value)

You can click the first button, wait for a new tab to open and then navigate back to http://localhost:8080/index.html, open the console and try to play with `window.newWindow` in there. For example, you can use its `console.log` function like this:
```javascript
window.newWindow.console.log('Hello from http://localhost:8080/index.html!');
```
to display something in the console at http://localhost:8080/greeting.html:

![hello from index.html](assets/hello-index.png)

![hello from greeting.html](assets/hello-greeting.png)

Now try to do the same thing after clicking the second button and you should see the following error:

```javascript
Uncaught DOMException: Blocked a frame with origin "http://localhost:8080" from accessing a cross-origin frame.
```

![hello from greeting.html - SOP error](assets/hello-sop-error.png)

This example proves that it's not the origin of the script itself (http://localhost:8081/main.js) that matters, but the origin of the page in which it is embedded (http://localhost:8080/index.html).
