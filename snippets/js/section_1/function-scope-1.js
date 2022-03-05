function f() {
  var a = 'inner value';
  console.log('a inside of f:', a);
}
f();
console.log('a outside of f:', a);