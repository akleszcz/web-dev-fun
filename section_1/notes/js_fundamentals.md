# JavaScript fundamentals

## History
> JavaScript, not to be confused with Java, was created in 10 days in May 1995 by Brendan Eich, then working at Netscape and now of Mozilla. JavaScript was not always known as JavaScript: the original name was Mocha, a name chosen by Marc Andreessen, founder of Netscape. In September of 1995 the name was changed to LiveScript, then in December of the same year, upon receiving a trademark license from Sun, the name JavaScript was adopted. This was somewhat of a marketing move at the time, with Java being very popular around then.

[Source](https://www.w3.org/community/webed/wiki/Es/Una_corta_historia_del_JavaScript)

## Comments
Two styles:
- Single line - `//`
```javascript
// This is a single-line comment.
```
- Multiline - `/* ... */`
```javascript
/* This is also a comment */
/*
 This is yet another comment.
 It has multiple lines.
*/
```
## Braces style
- Allman style:
```javascript
function foo(x, y, z)
{
  if (x)
  {
    a();
  } else {
    b();
    c();
  }
}
```
- 1TBS (One True Brace Style)
```javascript
function foo(x, y, z) {
  if (x) {
    a();
  } else {
    b();
    c();
  }
}
```
## Optional semicolons
JavaScript treats a line break as a
semicolon if the next nonspace character cannot be interpreted as a continuation of the
current statement. Consider the following code:
```javascript
let a
a
=
3
console.log(a)
```
JavaScript interprets this code like this:
```javascript
let a; a = 3; console.log(a);
```
Two exceptions:
- `return`, `break`, and `continue` - if a line break appears after any of these words (before
any other tokens), JavaScript will always interpret that line break as a semicolon.
Example:
```javascript
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

console.log('f():', f()); // returns {a: 5}
console.log('g():', g()); // returns undefined
```
-  ++ and −− operators:
If you want to use either of these operators as postfix operators, they
must appear on the same line as the expression they apply to.
Example:
```javascript
x
++
y
```
is parsed as `x; ++y;`, not as `x++; y`.

---
### Side note: prefix and postfix increments and decrements
Increment (`++`) and decrement (`--`) operators:
- Increase/decrease variable's value by 1.
- Can only be applied to variables, not numbers:
```
let a = 5;
a++;
console.log(a); // 6
5++; // Uncaught SyntaxError: Invalid left-hand side expression in postfix operation
```
- Can be applied in both prefix and postfix form:
   - Prefix: returns the value after the increment/decrement.
   - Postfix: returns the value before the increment/decrement.
```javascript
let a = 2;
let b = 2;
console.log(a++); // 2
console.log(a); // 3
console.log(++b); // 3
console.log(b); // 3
```
[Source](https://hackernoon.com/javascript-back-to-basics-prefix-vs-postfix-8da5256223d2)

---