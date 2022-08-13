# A simple HTTP server in vanilla Node.js

In this section, in the `examples` directory there's an `index.js` file that contains a very simple implementation of a basic HTTP server written in vanilla Node.js (without any framework). In order to start this server, go to the `examples` directory in your terminal and run:

```
node index.js
```

The server will start listening on port 3000. If it receives a GET request sent to the `/hello-world` endpoint, it responds with a status code 200 and a JSON object:

```json
{
  "message": "Hello world"
}
```

For any other request, it returns a response with a status code 400 ([Bad Request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400)). This logic is implemented in the following way:
- Import Node's built-in `http` module:
```js
const http = require('http');
```
- Use the module's `createServer` method to create an object that represents our server and save it to a variable:
```js
const server = http.createServer((req, res) => { ... });
```
The object returned by `createServer` is an instance of a class `http.Server`:

> Returns a new instance of `http.Server`.

https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener

The function we pass to `createServer` is called `requestListener` and is reponsible for handling the requests our server receives. More on that in the ["Request Listener" section](#request-listener) below.

The `http.Server` class extends a class called `net.Server` ([source](https://nodejs.org/api/http.html#class-httpserver)), which in turn extends `EventEmitter` ([source](https://nodejs.org/api/net.html#class-netserver)). This means that our `server` object is an instance of `EventEmitter` and, as such, emits events that we can listen to.


- Call the `listen` method on our `server` object. As the first argument, pass in the port number we want the server to listen on:
```js
server.listen(PORT, () => {
  console.log(`Server listening on port ${port}`);
});
```
The second argument here is a callback that will be added as a listener for the server's `listening` event:
> ### `server.listen()`
> (...)
> When the server starts listening, the 'listening' event will be emitted. The last parameter callback will be added as a listener for the 'listening' event.

https://nodejs.org/api/net.html#serverlisten

## Request Listener

> The `requestListener` is a function which is automatically added to the 'request' event.

https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener

When the server receives a request, Node calls `requestListener` with two arguments, which are typically named `req` and `res` (but we can name them differently, of course):
```js
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/hello-world') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
      message: 'Hello world',
    }));
  } else {
    res.statusCode = 400;
    res.end();
  }
});
```

As their names suggest, they represent HTTP request and response, respectively.

### The request object
The first parameter - `req` in our example server - is an instance of the [`http.IncomingMessage`](https://nodejs.org/api/http.html#class-httpincomingmessage) class. It contains information about the incoming request, such as:
- `method`:
  > The request method as a string. Read only. Examples: `'GET'`, `'DELETE'`.

  https://nodejs.org/api/http.html#messagemethod

- `url`:

  > Request URL string.

  https://nodejs.org/api/http.html#messageurl

  In our example, if we send a request to http://localhost:3000/hello-world, `req.url` will be equal to `/hello-world`. If our request URL contains query string parameters, they will be present in `req.url` as well. For example, for a request sent to http://localhost:3000/hello-world?param1=value1, `req.url` is equal to `/hello-world?param1=value1`.

  If we wanted to extract the parameters, we'd have to use the built-in `url.parse` method, as described in [How to access query string parameters](https://nodejs.org/en/knowledge/HTTP/clients/how-to-access-query-string-parameters/):
  ```js
  const url = require('url');
  ...
  const queryObject = url.parse(req.url, true).query;
  console.log(JSON.stringify(queryObject)); // {"param1":"value1"}
  ```

  > NOTE: the second parameter is a boolean stating whether the method should parse the query string, so we set it to `true`.

  We can also retrieve other information about the request URL:
  ```js
  const parsedUrl = url.parse(req.url,true);
  console.log('pathname', parsedUrl.pathname); // /hello-world
  console.log('search', parsedUrl.search); // ?param1=value1
  ```

- `headers`:
  > Key-value pairs of header names and values. Header names are lower-cased.

  https://nodejs.org/api/http.html#messageheaders

  Example:
  ```js
  {
    host: 'localhost:3000',
    connection: 'keep-alive',
    ...
  }
  ```

- `rawHeaders`:
  > The raw request/response headers list exactly as they were received.
  >
  > The keys and values are in the same list. It is not a list of tuples. So, the even-numbered offsets are key values, and the odd-numbered offsets are the associated values.
  >
  > Header names are not lowercased, and duplicates are not merged.

  https://nodejs.org/api/http.html#messagerawheaders

  Example:
  ```js
  [
    'Host',
    'localhost:3000',
    'Connection',
    'keep-alive',
    ...
  ]
  ```

The `http.IncomingMessage` class extends the `stream.Readable` class, which means that `req` is also a [readable stream](https://nodejs.org/api/stream.html#readable-streams).

### The response object
The `res` object, which represents the response sent by our server, is an instance of the [`http.ServerResponse`](https://nodejs.org/api/http.html#class-httpserverresponse) class.

The `http.ServerResponse` class extends the [`http.OutgoingMessage`](https://nodejs.org/api/http.html#class-httpoutgoingmessage) class, which extends [`stream`](https://nodejs.org/api/stream.html#stream).

Methods defined in `http.ServerResponse` include:
- `writeHead`:
  ```
  response.writeHead(statusCode[, statusMessage][, headers])
  ```
  > Sends a response header to the request. The status code is a 3-digit HTTP status code, like `404`. The last argument, `headers`, are the response headers. Optionally one can give a human-readable `statusMessage` as the second argument.

  https://nodejs.org/api/http.html#class-httpserverresponse

- `end`:
  ```
  response.end([data[, encoding]][, callback])
  ```
  > This method signals to the server that all of the response headers and body have been sent; that server should consider this message complete. The method, `response.end()`, MUST be called on each response.
  >
  > If `data` is specified, it is similar in effect to calling [`response.write(data, encoding)`](https://nodejs.org/api/http.html#responsewritechunk-encoding-callback) followed by `response.end(callback)`.
  >
  > If `callback` is specified, it will be called when the response stream is finished.

  https://nodejs.org/api/http.html#responseenddata-encoding-callback

## Additional resources
You can read more about HTTP servers in Node.js at https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/.

## Frameworks
This example demonstrates that it is possible to implement an HTTP server in Node.js without any external packages. However, doing it this way requires us to perform many repetitive tasks. For example, if we wanted to define different responses for different request endpoints and methods, we would have to write more conditions similar to
```js
if (req.method === 'GET' && req.url === '/hello-world')
```
(perhaps using the `switch` statement instead of `if`), or create a helper function. We would also have to parse the `res.url` object in order to retrieve request URL's pathname or query string parameters.

Fortunately for us, there are many free, open-source frameworks that provide common functionalities like this. [Express.js](https://expressjs.com/) is one of the most popular ones - it's lightweight, unopinionated and fairly easy to learn.