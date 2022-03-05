var scope = 'global scope';
function f() {
  var scope = 'local scope';
  function g() {
    var scope = 'nested scope';
    console.log('scope from g:', scope);
  }
  g();
  console.log('scope from f:', scope);
}
f();
console.log('scope outside of f:', scope);