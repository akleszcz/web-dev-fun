const p = Promise.allSettled([]);
p.then((result) => console.log('Result: ', result));
console.log(p);

