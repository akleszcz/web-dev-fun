# Types in JavaScript
- Primitive types:
   - Number
   - String
   - Boolean
   - Symbol (ES2015 aka ES6)
   - BigInt (new in ES2020 aka ES11)
   - `null`
   - `undefined`
- Object type
   - An unordered collection of properties where each property has a name and a value (either a primitive value, such as a number or string, or an object). Example:
``` javascript
let cat = {
   name: 'Fluffy',
   age: 2,
   owner: {
      firstname: 'John',
      lastname: 'Smith'
   }
};
console.log(cat.name); // Fluffy
console.log(cat.owner.lastname); // Smith
```
   - Any JavaScript value that is not of a primitive type, is an object.
   - Some special kinds of objects:
      - Function
      - Array
      - Date
      - RegExp
      - Error
      - Map, Set, WeakMap, WeakSet (new in ES6)
   - Example - function as an object:
``` javascript
function sayHello() {
   console.log('hello');
}
sayHello(); // hello
console.log('sayHello.name:', sayHello.name); // sayHello.name: sayHello
sayHello.newProperty = 'newValue';
console.log('sayHello.newProperty: ', sayHello.newProperty); // sayHello.newProperty: newValue
```

## Dynamic typing
JavaScript is a loosely typed and dynamic language. Variables in JavaScript are not directly associated with any particular value type, and any variable can be assigned (and re-assigned) values of all types:
```javascript
let foo = 42;    // foo is now a number
foo     = 'bar'; // foo is now a string
foo     = true;  // foo is now a boolean
```
[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)

For static typing you can use TypeScript - a superset of JavaScript that compiles to plain JavaScript.

## Number
JavaScript does not make a distinction between integer values
and floating-point values.

#### Integer literals
- Base-10 integers:
```javascript
0
3
10000000
```
- Hexadecimal (base-16) integers: "0x" or "0X", followed by a string of hexadecimal digits:
```javascript
0xff // 15*16 + 15 = 255 (base 10)
0XCAFE911
```
```javascript
let x = 0xff;
let y = 255; 
x === y; // true
```
- Octal (base-8) integers:
   - Available in some implementations of JavaScript.
   - ECMAScript standard does not support them.
   - 0 followed by a sequence of digits, each between 0 and 7.
   - Example:
```javascript
0377 // 3*64 + 7*8 + 7 = 255 (base 10)
```
   - forbidden in strict mode:
```javascript
let x = 03; // OK
```
```javascript
'use strict';
let x = 03; // Uncaught SyntaxError: Octal literals are not allowed in strict mode.
```
- Number to string convertion:
```javascript
number.toString(radix)
```
```javascript
let a = 180;
a.toString(); // "180"
a.toString(8); // "264"
a.toString(16); // "b4"

let b = 2.5;
b.toString(); // "2.5"
b.toString(8); // "2.4"
b.toString(16); // "2.8"
```

### Floating-Point Literals
- Traditional notation:
```javascript
5.67
-1234.789
```
- Exponential notation:
```javascript
6.02e23 // 6.02 × 10^23
1.4738223E-32 // 1.4738223 × 10^(−32)
```
## Boolean
- Only two possible values: `true` and `false`.
- Any other value is either truthy or falsy. Any time JavaScript expects a boolean value, a falsy value
works like false and a truthy value works like true.
- falsy values:
   - `0`
   - `-0`
   - `null`
   - `false`
   - `NaN`
   - `undefined`
   - `""` (empty string)
- All other values, including `{}`, `[]` or the string "false", are truthy.
- Example:
```javascript
let x = "";
if (x) {
    console.log('x is truthy!');
} else {
    console.log('x is falsy!');
}
```
### Boolean operators
#### AND: `&&`
If the value on the left is falsy, `&&` simply returns the value on the left and does not even evaluate the expression on the right.
If the value on the left is truthy, the `&&` operator evaluates and returns the value on the right.

Example:
```javascript
let o = { x : 1 };
let p = null;
o && o.x // 1: o is truthy, so return value of o.x
p && p.x // null: p is falsy, so return it and don't evaluate p.x
```
#### OR: `||`
If the value of the first operand is truthy, it returns that truthy
value. Otherwise, it evaluates its second operand and returns its value.

Example:
```javascript
let x = 5 || ''; // 5
let y = 0 || ''; // ''
```
`||` operator is often used to supply default values for variables:
```javascript
window.googletag = window.googletag || {};
googletag.cmd = googletag.cmd || [];
```
#### NOT: `!`
if `x` is truthy, `!x` evaluates to
false. If `x` is falsy, then `!x` is true.

You can convert any value `x` to its
equivalent boolean value by applying this operator twice: 
```javascript
let x =[0];
!!x; // true
let y = null;
!!y; // false
```
#### Operators precedence
- `&&` has higher precedence than `||`
```javascript
true || false && false; // true
true || (false && false); // true
(true || false) && false; // false
```
- Relational operators have higher precedence than `&&` and `||`, so
```javascript
x === 0 && y === 0
```
is the same as
```javascript
(x === 0) && (y === 0)
```

## Type conversions
@TODO
```javascript
[] + []; // "" - empty string
[] + {}; // "[object Object]"
{} + []; // 0
{} + {}; // NaN
{} + {} // "[object Object][object Object]"
```
[Source](https://www.quora.com/Why-is-JavaScript-called-the-most-confusing-web-programming-language)