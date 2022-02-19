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
---
### Note: `for...in` loop
> The `for...in` statement iterates over all enumerable properties of an object that are keyed by strings (ignoring ones keyed by Symbols), including inherited enumerable properties.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)

---
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
  console.log(window.x); // 5
  ```
   - disallowed in strict mode:
  ```javascript
  'use strict';
  x = 5;
  console.log(x); // Uncaught ReferenceError: x is not defined
  ```
---
### Note: global variables
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

---
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
console.log('scope outside of f:', scope); // scope outside of f: global scope
```
### Hoisting
- JavaScript code behaves as if all variable declarations with `var` in a function were "hoisted" to the top of the function.

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
console.log(window.x); // global
console.log(window.y); // undefined
```
[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

### Hoisting
- `let` variables **are** hoisted, but trying to access them before their declaration will cause an error:
```javascript
let x = 'outer';
{
  console.log('x inside of f:', x); // Uncaught ReferenceError: Cannot access 'x' before initialization
  let x = 'inner';
}
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
'use strict';
console.log(typeof undeclaredVariable); // undefined
console.log(typeof varVariable); // undefined
console.log(typeof letVariable); // Uncaught ReferenceError: Cannot access 'letVariable' before initialization
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
- IIFE - the `i` variable is passed to
the IIFE, which creates its own copy and stores it as value: 
```javascript
var funcs = [];
for (var i = 0; i < 10; i++) {
  funcs.push((function(value) {
    return function() {
      console.log(value);
    }
  }(i)));
}
funcs.forEach(function(func) {
  func(); // 0, 1, ..., 9
});
```
- using `let` instead of `var` - the `let` declaration creates a new variable `i` each time
through the loop, so each function created inside the loop gets its own
copy of `i`. Each copy of `i` has the value it was assigned at the beginning of
the loop iteration in which it was created:
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

## `const`
- Variables declaration and initialization  - variable's value must be specified in the same statement in which it's declared:
```javascript
const name = "John";
const x = 0, y = 0, z = 0;
```
```javascript
const a; // Uncaught SyntaxError: Missing initializer in const declaration
```
- Variable reassignment - illegal in both strict and non-strict mode:
```javascript
// 'use strict';
const a = 5;
a = 7; // Uncaught TypeError: Assignment to constant variable.
```
### Note
> If a variable is never reassigned, using the const declaration is better.
>
> const declaration tells readers, "this variable is never reassigned," reducing cognitive load and improving maintainability.

[Source](https://eslint.org/docs/rules/prefer-const)

ESLint `prefer-const` rule can be used to make sure `let` declarations are used only when necessary.

---
- Variable value modification - the value a constant holds can be modified if it is an object:
```javascript
const o = {
    a: 1
};
o.a = 2;
console.log(o); // {a: 2}
```
### Note: prevent objects modifications
If we want to prevent an object from being modified, we can use one of the methods: ` Object.preventExtensions`, `Object.seal` and `Object.freeze`. See [Objects. Prevent objects modifications](objects.md#prevent-objects-modifications) for more details

---
- Variable declaration and initialization in a loop:
```javascript
const array = ['a', 'b', 'c'];

// Produces:
// first loop: a
// first loop: b
// first loop: c
for (const element of array) {
  console.log('first loop:', element);
} 

// Produces:
// second loop: a
// second loop: b
// second loop: c
const o = {
  a: 1,
  b: 2,
  c: 3,
};
for (const p in o) {
  console.log('second loop:', p);
}

// Produces:
// third loop: a
// Uncaught TypeError: Assignment to constant variable.
for (const i = 0; i  < array.length; i++) {
  console.log('third loop:', array[i]);
}
```

- Repeated declarations - illegal (even in non-strict mode).

Examples:
```javascript
const x = 5;
const x = 'Hello'; // Uncaught SyntaxError: Identifier 'x' has already been declared
```
```javascript
const x = 5;
var x = 'Hello'; // Uncaught SyntaxError: Identifier 'x' has already been declared
```
### Variable scope
- *Block scope* instead of *function scope*:
```javascript
const x = 1;
if (x === 1) {
  const x = 2;
  console.log(x); // 2
}
console.log(x); // 1
```
### Global variables
-  Declaring a global variable with `const` does not create a property on the global object.

Example:
```javascript
var x = 'global';
const y = 'global';
console.log(window.x); // global
console.log(window.y); // undefined
```
### Temporal dead zone (TDZ)
- `const` variables can be in TDZ just like `let` variables:
```javascript
function f() {
  console.log('x: ', x); // x:  undefined
  console.log('y: ', y); // Uncaught ReferenceError: Cannot access 'y' before initialization
  var x = 1;
  const y = 2;
}
f();
```


To read: https://exploringjs.com/deep-js/ch_global-scope.html#creating-variables-declarative-record-vs.-object-record
https://www.freecodecamp.org/news/an-introduction-to-scope-in-javascript-cbd957022652/