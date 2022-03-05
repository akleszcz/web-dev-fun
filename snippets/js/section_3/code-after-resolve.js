const p = new Promise(function (resolve, reject) {
  resolve(5);
  console.log('I am still executed!');
});
console.log('After promise');

p.then((result) => console.log('Result: ', result));
