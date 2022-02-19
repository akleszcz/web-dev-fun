const fs = require('fs');
const path = require('path');

try {
  fs.readFile(path.join(__dirname, 'filename.txt'), 'utf8', function (err, filename) {
    if (err) {
      throw err;
    }
    fs.readFile(path.join(__dirname, filename), 'utf8', function (err, name) {
      if (err) {
        throw err;
      }
      console.log(`Hello, ${name}!`);
    });
  });
} catch (err) {
  console.error(err);
}
console.log('Hi!');