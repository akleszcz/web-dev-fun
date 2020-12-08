const array = ['a', 'b', 'c'];
for (const element of array) {
  console.log('first loop:', element);
} 

const o = {
  a: 1,
  b: 2,
  c: 3,
};
for (const p in o) {
  console.log('second loop:', p);
}

for (const i = 0; i  < array.length; i++) {
  console.log('third loop:', array[i]);
}