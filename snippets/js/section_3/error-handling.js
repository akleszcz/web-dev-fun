function fail() {
  return new Promise(function (resolve, reject) {
    reject(new Error('I reject!'));
  });
}

function succeed() {
  return new Promise(function (resolve, reject) {
    resolve('I succeed!');
  });
}

fail()
  .catch(console.error)
  .then(succeed)
  .then(console.log);
