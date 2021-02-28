function readFile(filename, callback) { // Imagine this is a real readFile function from Node JS
  setTimeout(function () {
    if (filename === 'example.txt') {
      callback(null, 'Raya from "Raya and the Last Dragon" has a pet Tuk Tuk, who is a mix of an armadillo and a pill bug.');
    } else {
      callback(new Error('File not found'));
    }
  }, 2000);

}

readFile('example.txt', function (err, contents) {
  if (err) {
    throw err;
  }
  console.log(contents);
});

console.log('Hi!');