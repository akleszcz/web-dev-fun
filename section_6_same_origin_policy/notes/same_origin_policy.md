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

## Example
In `section_6_same_origin_policy\examples` you can find two directories: `origin1` and `origin2` and a `package.json` file containig two scripts:
- `start:origin1` - which starts a simple HTTP server in the `origin1` directory on port 8080,
- `start:origin2` - which starts a simple HTTP server in the `origin2` directory on port 8081.

Run `npm install` (still in the `section_6_same_origin_policy\examples` directory) to install `http-server`. Then run `npm run start:origin1` to start the first server, open a new terminal window and run `npm run start:origin2` there to start the second server.

Next navigate to http://localhost:8080/index.html. You will see a heading saying ** and two buttons: `Open http://localhost:8080/greeting.html` and `Open http://localhost:8081/greeting.html`. When you click the first one, a new window will open with a message *Greeting from http://localhost:8080!*. When you click the second one, another window will be opened, but with no greeting message this time.

Now let's analyze the code. In `section_6_same_origin_policy\examples\origin1\index.html`, we have an `h1` heading and the two buttons mentioned earlier:
```html
  <h1 id="hello-container"></h1>
  <button id="open-8080">Open http://localhost:8080/greeting.html</button>
  <br/>
  <button id="open-8081">Open http://localhost:8081/greeting.html</button>
```

There's also a script tag pointing to a JS file served in `origin2`:
```html
  <script src="http://localhost:8081/main.js"></script>
```

This script file is responsible for filling the heading with *Hello from http://localhost:8080!* and for handling the buttons' click events. If you take a look at the source code in `section_6_same_origin_policy\examples\origin2\main.js`, you will see that when one of the buttons is clocked, the following happens:
  btn8081.addEventListener('click', () => {
- the respective URL (http://localhost:8080/greeting.html or http://localhost:8081/greeting.html) is opened is a new tab
- the script attempts to access DOM of the page is has just opened in order to display a greeting.

This works for the page served from [localhost:8080](http://localhost:8080/greeting.html), but not for the one from http://localhost:8081/greeting.html. This proofs the point that it's not the origin of the script itself (http://localhost:8081/main.js) that matters, but the origin of the page in which it is embedded (http://localhost:8080/index.html).


