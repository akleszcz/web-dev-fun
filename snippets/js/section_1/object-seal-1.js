const o = {
  x: 5
};

console.log(Object.isSealed(o));
Object.seal(o);
console.log(Object.isSealed(o));

o.x = 100;
o.y = 200;

console.log(o.x);
console.log(o.y);

console.log(delete o.x);
console.log(o.x);
