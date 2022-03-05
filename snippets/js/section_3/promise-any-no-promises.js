const p1 = Promise.any(['one', 2]);
p1.then((result) => console.log('Result: ', result))
  .catch((error) => console.log('Error: ', error));
console.log(p1);

const p2 = Promise.any([2, 'one']);
p2.then((result) => console.log('Result: ', result))
  .catch((error) => console.log('Error: ', error));
console.log(p2);
