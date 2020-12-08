var x = 'outer';
function f() {
  x = 'inner';
  console.log('x inside of f:', x);
}
f();
console.log('x outside of f:', x);