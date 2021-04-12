const p = Promise.all([
  123,
  'According to WWF, pandas need at least 2 different bamboo species in their range to avoid starvation',
]).then((result) => console.log('Result: ', result));
console.log(p);
setTimeout(() => console.log(p));
