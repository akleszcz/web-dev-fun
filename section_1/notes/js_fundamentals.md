# JavaScript fundamentals

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