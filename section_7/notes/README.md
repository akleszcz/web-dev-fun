# Debugging Node.js memory leaks with Chrome DevTools

This section is based on the article [Finding And Fixing Node.js Memory Leaks: A Practical Guide](https://marmelab.com/blog/2018/04/03/how-to-track-and-fix-memory-leak-with-nodejs.html) by Kévin Maschtaler.

## Project description

There is a very simple HTTP server defined in `section_7/src/server.js`. It listens for requests on port 3000. Upon receiving a request, it does two things:

- it creates an object containing request details (its URL, HTTP method and date) and pushes it to an array called `requestLogs`,
- it returns the stringified `requestLogs` array as a response.

This way, the `requestLogs` array contains more and more elements with every request until the server is restarted.

## How to run it

In order to run the project, you have to:

- go to the `section_7` directory:

```
$ cd section_7
```

- install dependencies:

```
$ npm install
```

- start the server:

```
$ npm start
```

You should see a message: _Server is running on port 3000_ in the console. Now, when you navigate to http://localhost:3000/ in a browser of your choice, you should see a response similar to the one below:

```
[{"url":"/","method":"GET","date":"2021-06-19T09:57:06.444Z"}]
```

Every time you reload the page, the array in the response will contain one more element.

You can also send a request with a different HTTP method, e.g. POST, using a tool like `curl` or Postman. With `curl` you can do it like this:

```
$ curl -X POST http://localhost:3000
[{"url":"/","method":"POST","date":"2021-06-19T10:00:54.114Z"}]
```

## Memory leak detection

As you can see, the `requestLogs` array gets bigger and bigger with every request. The memory allocated to the objects it contains is never freed up without restarting the server. The application is simple enough to identify the reason of this memory leak by analysing the code, but what if it was more complicated? Fortunately, there are tools that can help us with this task, Chrome DevTools being one of them. You can see how to use them by following the instructions below:

- Start the server again, this time by running the `start:inspect` script:

```
npm run start:inspect
```

This command runs our app with the `--inspect` flag, which makes the Node.js process listen for a debugging client. You can find more information about it [here](https://nodejs.org/en/docs/guides/debugging-getting-started/).

You should see a result similar to the one below:

```
Debugger listening on ws://127.0.0.1:9229/da1e39bc-52fe-4364-a7d4-f3b1164ce325
For help, see: https://nodejs.org/en/docs/inspector
Server is running on port 3000
```

- Visit `chrome://inspect/#devices` address in Chrome. In the Devices section, you should see our app listed (you may need to wait for a while before it appears):

![remote target](./assets/remote-target.png)

Click on *Inspect*.

Sources:

- _Finding And Fixing Node.js Memory Leaks: A Practical Guide_, https://marmelab.com/blog/2018/04/03/how-to-track-and-fix-memory-leak-with-nodejs.html
- _loadtest_, https://github.com/alexfernandez/loadtest
