function f() {
  return {
    a: 5
  };
}

function g() {
  return
  {
    a: 5
  };
}

console.log('f():', f());
console.log('g():', g());