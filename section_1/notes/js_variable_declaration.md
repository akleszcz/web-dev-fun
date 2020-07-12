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
- Variables declaration with the same `var` keyword:
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

var o = {
  a: 1,
  b: 2,
  c: 3,
};
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
- *Function scope* instead of *block scope*. See also [Function vs block scope & hoisting](#function-vs-block-scope-&-hoisting) for a more detailed example.

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
   - Nested function definitions - each function has its own local scope.

Example:
```javascript
var scope = 'global scope';
function f() {
  var scope = 'local scope';
  function g() {
    var scope = 'nested scope';
    console.log('scope from g:', scope); // scope from g: nested scope
  }
  g();
  console.log('scope from f:', scope); // scope from f: local scope
}
f();
console.log('scope outside of f: ', scope); // scope outside of f:  global scope
```
### Hoisting
- JavaScript code behaves as if all variable declarations with `var` in a function are "hoisted" to the top of the function.

Example:
```javascript
var scope = 'global';
function f() {
  console.log(scope); // undefined
  var scope = 'local';
  console.log(scope); // local
}
f();
```
is functionally equivalent to:
```javascript
var scope = 'global';
function f() {
  var scope;
  console.log(scope); // undefined
  scope = 'local';
  console.log(scope); // local
}
f();
```
### Function vs block scope & hoisting
Example:
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

### Global variables
-  Declaring a global variable with `var` = defining
a **nonconfigurable** property of the global object.
- Assigning a value to an undeclared variable (in non-strict mode) = defining a **configurable** property of the global object.

Example:
```javascript
var x = 5;
y = 6;
console.log(window.x); // 5
console.log(window.y); // 6
console.log(delete window.x); // false
console.log(delete window.y); // true
```
@TODO: read more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var

## `let`

Examples:
- Variables declaration:
```javascript
let a; // a is undefined
let b; // b is undefined
```
- Variables declaration with the same `let` keyword:
```javascript
let a, b;
```
- Variables declaration and initialization:
```javascript
let name = "John";
let x = 0, y = 0, z = 0;
```
- Variable declaration and initialization in a loop:
```javascript
for (let i = 0; i < 10; i++) {
  console.log(i);
}

for (let i = 0, j = 10; i < 10; i++, j--) {
  console.log(i * j);
}

let o = {
  a: 1,
  b: 2,
  c: 3,
};
for (let p in o) {
  console.log(p);
}
```
- Repeated declarations - illegal (even in non-strict mode).

Examples:
```javascript
let x = 5;
let x = 'Hello'; // Uncaught SyntaxError: Identifier 'x' has already been declared
```
```javascript
let x = 5;
var x = 'Hello'; // Uncaught SyntaxError: Identifier 'x' has already been declared
```
### Variable scope
- *Block scope* instead of *function scope*.

Examples:
```javascript
let x = 1;
if (x === 1) {
  let x = 2;
  console.log(x); // 2
}
console.log(x); // 1
```
[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
```javascript
for (let i = 0; i < 10; i++) {
  console.log(i);
}
console.log('i after loop:', i); // Uncaught ReferenceError: i is not defined
```
### Global variables
-  Declaring a global variable with `let` does not create a property on the global object.

Example:
```javascript
var x = 'global';
let y = 'global';
console.log(this.x); // global
console.log(this.y); // undefined
```
[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

### Hoisting
- `let` variables **are** hoisted, but trying to access them before their declaration will cause an error:
```javascript
let x = 'outer';
function f() {
  console.log('x inside of f:', x);
  let x = 'inner';
}
f(); // Uncaught ReferenceError: Cannot access 'x' before initialization
```
From the start of the block until the initialization is processed the variable is in a...
### Temporal dead zone (TDZ)
- `let` variables are not initialized until their definition is evaluated.

Example:
```javascript
function f() {
  console.log('x: ', x); // x:  undefined
  console.log('y: ', y); // Uncaught ReferenceError: Cannot access 'y' before initialization
  var x = 1;
  let y = 2;
}
f();
```
- `typeof` operator throws error on variables in temporal dead zone:
```javascript
console.log(typeof undeclaredVariable); // undefined
console.log(typeof varVariable); // undefined
console.log(typeof letVariable); // Uncaught ReferenceError: letVariable is not defined
let letVariable = 1;
var varVariable = 2;
```
This code, however, works because of `let` declaration being in a separate block:
```javascript
console.log(typeof letVariable); // undefined
{
 let letVariable = "test";
}
```
### More examples
#### Functions in loops
```javascript
var funcs = [];
for (var i = 0; i < 10; i++) {
 funcs.push(function() {
 console.log(i);
 });
}
funcs.forEach(function(func) {
 func();
}); // 10, 10, ..., 10
```
> The reason is that `i` is shared
across each iteration of the loop, meaning the functions created inside the
loop all hold a reference to the same variable. The variable `i` has a value
of 10 when the loop completes, so when `console.log(i)` is called, that value
prints each time.

Solutions:
- IIFE:
```javascript
var funcs = [];
for (let i = 0; i < 10; i++) {
 funcs.push(function() {
 console.log(i);
 });
}
funcs.forEach(function(func) {
 func(); // 0, 1, ..., 9
})
```
- using `let` instead of `var`:
```javascript
var funcs = [];
for (let i = 0; i < 10; i++) {
 funcs.push(function() {
 console.log(i);
 });
}
funcs.forEach(function(func) {
 func();
}); // 0, 1, ..., 9
```
Source: *Understanding ECMAScript 6: The Definitive Guide for JavaScript Developers*, Nicholas C. Zakas

@TODO:
- Temporal dead zone: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone
http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified
- Hoisting - example:
```javascript
let foo = () => bar; let bar = 'bar'; foo();
```
Source:
https://stackoverflow.com/questions/31219420/are-variables-declared-with-let-or-const-hoisted
Reference:
https://www.ecma-international.org/ecma-262/9.0/index.html#sec-let-and-const-declarations

## `const`
@TODO

To read: https://exploringjs.com/deep-js/ch_global-scope.html#creating-variables-declarative-record-vs.-object-record
https://www.freecodecamp.org/news/an-introduction-to-scope-in-javascript-cbd957022652/