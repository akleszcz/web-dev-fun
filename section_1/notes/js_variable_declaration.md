# Variable declaration
Variables can be declared with three keywords:
- `var`
- `let` (new in ES6)
- `const` (new in ES6)

## `var`
Examples:
- Variables declaration:
```javascript
var a; // a is undefined
var b; // b is undefined
```
- Variables declaratioin with the same `var` keyword:
```javascript
var a, b;
```
- Variables declaration and initialization:
```javascript
var name = "John";
var x = 0, y = 0, z = 0;
```
- Variable declaration and initialization in a loop:
```javascript
for (var i = 0; i < 10; i++) {
  console.log(i);
}

for (var i = 0, j = 10; i < 10; i++, j--) {
  console.log(i * j);
}

for (var p in o) {
  console.log(p);
}
```
- Repeated declarations - legal (even in strict mode):
```javascript
'use strict';
var x = 5;
var x = 'Hello'; // acts as if it were simply an assignment statement.
console.log(x); // Hello
```
### Undeclared variables
- Trying to read an undeclared variable - error:
```javascript
console.log(x); // Uncaught ReferenceError: x is not defined
5 + y; // Uncaught ReferenceError: y is not defined
```
- Assigning a value to an undeclared variable:
   - allowed in non-strict mode (variable is created as a property of the global object):
```javascript
x = 5;
console.log(x); // 5
console.log(window.x); // 5 (in browser's console)
```
   - disallowed in strict mode:
```javascript
'use strict';
x = 5;
console.log(x); // 5
console.log(window.x); // 5
```
### Variable scope
- *Function scope* instead of *block scope* for variables declared with `var`.

Example 1:
```javascript
function f() {
  var a = 'inner value';
  console.log('a inside of f:', a);
}
f(); // a inside of f: inner value
console.log('a outside of f:', a); // Uncaught ReferenceError: a is not defined
```

Example 2:
```javascript
var x = 'outer';
function f() {
  var x = 'inner'; // new variable declared with var
  console.log('x inside of f:', x);
}
f(); // x inside of f: inner
console.log('x outside of f:', x); // x outside of f: outer
```
Example 3:
```javascript
var x = 'outer';
function f() {
  x = 'inner'; // no var keyword this time
  console.log('x inside of f:', x);
}
f(); // x inside of f: inner
console.log('x outside of f:', x); // x outside of f: inner
```
---
### Note: variable shadowing
> Shadowing is the process by which a local variable shares the same name as a variable in its containing scope. For example:
> ```javascript
> var a = 3;
> function b() {
>   var a = 10;
> }
> ```
> In this case, the variable a inside of b() is shadowing the variable a in the global scope. This can cause confusion while reading the code and it's impossible to access the global variable.

[Source](https://eslint.org/docs/rules/no-shadow)

ESLint `no-shadow` rule can be used to prevent variable shadowing.

---
Example 4:
```javascript
try {
  console.log('k before the function:', k);
} catch (error) {
  console.log('error: ', error); // error:  ReferenceError: k is not defined
}
function f(o) {
  console.log('k before the if block:', k); // k before the if block: undefined
  if (o) {
    var j = 0;
    console.log('k before the loop:', k); // k before the loop: undefined
    for (var k = 0; k < 10; k++) {
      console.log('k from the loop:', k); // k from the loop: 0, 1, ..., 9
    }
    console.log('k after the loop:', k); // k after the loop: 10
  }
  console.log('j after the if block:', j); // j after the if block: 0
}
f({}); // reminder: {} is truthy
```
   - Nested function definitions - each function has its own local scope.

Example:
```javascript
var scope = "global scope";
function f() {
  var scope = "local scope";
  function g() {
    var scope = "nested scope";
    console.log('scope from g:', scope); // scope from g: nested scope
  }
  g();
  console.log('scope from f:', scope); // scope from f: local scope
}
f();
console.log('scope outside of f: ', scope); // scope outside of f:  global scope
```
### Hoisting
- JavaScript code behaves as if all variable declarations in a function are "hoisted" to the top of the function.

Example:
```javascript
var scope = "global";
function f() {
  console.log(scope); // undefined
  var scope = "local";
  console.log(scope);// local
}
f();
```
is functionally equivalent to:
```javascript
var scope = "global";
function f() {
  var scope;
  console.log(scope); // undefined
  scope = "local";
  console.log(scope); // local
}
f();
```
@TODO

To read: https://exploringjs.com/deep-js/ch_global-scope.html#creating-variables-declarative-record-vs.-object-record
https://www.freecodecamp.org/news/an-introduction-to-scope-in-javascript-cbd957022652/