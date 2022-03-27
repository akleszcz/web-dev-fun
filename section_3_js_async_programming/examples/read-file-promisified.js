const fs = require('fs');
const path = require('path');

function readFilePromisified(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, filename), 'utf-8', function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

readFilePromisified('filename.txt')
  .then(filename => readFilePromisified(filename))
  .then(name => console.log(`Hello, ${name}!`))
  .catch(console.error);

console.log('Hi!');