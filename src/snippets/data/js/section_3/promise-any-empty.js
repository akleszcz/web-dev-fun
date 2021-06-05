const p = Promise.any([]);
p.then((result) => console.log('Result: ', result))
.catch((error) => console.log('Error: ', error));
console.log(p);
