const fs = require('fs');
const path = require('path');

function readFilePromisified(path, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

readFilePromisified(path.join(__dirname, 'filename.txt'), 'utf8')
  .then(filename => readFilePromisified(path.join(__dirname, filename), 'utf8'))
  .then(name => console.log(`Hello, ${name}!`))
  .catch(console.error);

console.log('Hi!');