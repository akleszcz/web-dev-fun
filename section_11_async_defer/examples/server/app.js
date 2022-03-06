// Based on https://nodejs.org/en/knowledge/HTTP/servers/how-to-serve-static-files/
const fs = require('fs');
const http = require('http');

const port = 8081;

http.createServer(function (req, res) {
  const { url } = req;
  let delayInMs;

  switch (url) {
    case '/index1.js':
      delayInMs = 5000;
      break;
    case '/index2.js':
      delayInMs = 3000;
      break;
    default:
      delayInMs = 0;
  }

  setTimeout(function () {
    fs.readFile(__dirname + req.url, function (err, data) {
      console.log('url: ', url);
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  }, delayInMs);
}).listen(port);

console.log(`Listening on port ${port}!`);
