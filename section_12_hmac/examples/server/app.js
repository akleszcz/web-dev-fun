const express = require('express');
require('dotenv').config({ path: '../.env' });

const { hmacMiddleware } = require('./middlewares/hmac');

const app = express();
const port = 3000;

app.use(express.text());
app.use(hmacMiddleware(process.env.SECRET));

app.post('/', function (_, res) {
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
