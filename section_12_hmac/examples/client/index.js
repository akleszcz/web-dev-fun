require('dotenv').config({ path: '../.env' });
const fetch = require('node-fetch');

const { calculateRequestSignature } = require('../hmac');

const requestData = {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain',
  },
  body: 'Hello!',
};

const hostname = 'localhost';
const path = '/';
const paramsObject = { a: 1, b: 2 };
const params = new URLSearchParams(paramsObject);
const url = `http://${hostname}:3000${path}?${params.toString()}`;

const hmacSignature = calculateRequestSignature(process.env.SECRET, {
  ...requestData,
  hostname,
  path,
  query: params
});
requestData.headers['Auth-Signature'] = hmacSignature;

fetch(url, requestData)
  .then((response) => response.text())
  .then((responseText) => {
    console.log('responseText: ', responseText);
  })
  .catch((error) => console.error('error: ', error));
