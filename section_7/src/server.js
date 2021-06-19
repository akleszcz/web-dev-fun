const http = require("http");

const requestLogs = [];
const server = http.createServer((req, res) => {
  requestLogs.push({ url: req.url, method: req.method, date: new Date() });
  res.end(JSON.stringify(requestLogs));
});

server.listen(3000);
console.log("Server is running on port 3000");