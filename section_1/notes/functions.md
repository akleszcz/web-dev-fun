# Functions
## Function declaration (function statement)
### Syntax
```javascript
function name([param[, param[, ... param]]]) {
   statements
}
```
[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)
### Example
```javascript
function add(x, y) {
  return x + y;
}
```
---
## Function expression
### Syntax
> The expression is not allowed at the start of a statement.
> ```javascript
> function [name]([param1[, param2[, ..., paramN]]]) {
>    statements
> }
> ```
> As of ES2015, you can also use arrow functions.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function)

> A function expression is very similar to and has almost the same syntax as a function declaration (see function statement for details). The main difference between a function expression and a function declaration is the function name, which can be omitted in function expressions to create anonymous functions.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function)

Functions defined with function expressions are often:
- assigned to variables:
  ```javascript
  const add = function (x, y) { return x + y; };
  ```
  This allows for a more concise syntax when arrow functions are used (see [Arrow functions](#arrow-functions) for more details):
  ```javascript
  const add = (x, y) =>  x + y;
  ```
- passed as arguments to other functions (see [Use cases](####use-cases) for more details and examples) 

### Anonymous and named expressions
Function name is optional in a function expression. Depending on whether it is provided or not, the function expression is:
- `anonymous` - of the name is not provided,
- `named` - **this name is then local only to the function body (scope)**

  [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function).

The benefits of named function expressions are that:
- in case of an error, the stack trace will contain the name of the function
- it allows the function to refer to itself within its body

### Use cases
> Function expressions are convenient when passing a function as an argument to another function.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

> Function expressions are invoked to avoid polluting the global scope. Instead of your program being aware of many different functions, when you keep them anonymous, they are used and forgotten immediately.

[Source](https://www.freecodecamp.org/news/when-to-use-a-function-declarations-vs-a-function-expression-70f15152a0a0)

### Examples
- anonymous function expression
  ```javascript
  const arr = [1, 2, 3, 4, 5];
  const arrDoubled = arr.map(function (n) { return 2*n; });
  console.log(arrDoubled);
  ```
- a more concise syntax can be achieved with arrow functions: 
  ```javascript
  const arr = [1, 2, 3, 4, 5];
  const arrDoubled = arr.map(n => 2*n);
  console.log(arrDoubled);
  ```

- named function expression
  ```javascript
  const arr = [1, 2, 3, 4, 5];
  const arrFactorial = arr.map(function fac(n) { return n < 2 ? 1 : n * fac(n - 1); });
  console.log(arrFactorial);
  ```

## Function declarations vs function expressions

> Function expressions in JavaScript are not hoisted, unlike function declarations. You can't use function expressions before you create them.

[Source](https://developer.mozilla.org/en-US/docs/web/JavaScript/Reference/Operators/function)

### Example
```javascript
console.log('+: ', add(5, 7));
console.log('-: ', subtract(5, 7));

function add(x, y) {
  return x + y;
}

const subtract = function(x, y) {
  return x - y;
};

// console.log('-: ', subtract(5, 7));
```
---
## The `arguments` object

### The number of function's parameters in JS
> JavaScript function definitions do not specify an expected type for the function parameters, and function invocations do not do any type checking on the argument values
you pass. In fact, JavaScript function invocations do not even check the number of
arguments being passed.

**Source**: *JavaScript: The Definitive Guide*, 6th Edition, David Flanagan

#### Example
```javascript
function add(x, y) {
  return x + y;
}
add(5, 7, 9, 11); // no error; result: 12
```

> When a function is invoked with fewer arguments than declared parameters, the additional parameters are set to the `undefined` value. 

**Source**: *JavaScript: The Definitive Guide*, 6th Edition, David Flanagan

#### Example
```javascript
function add(x, y) {
  console.log('x: ', x);
  console.log('y: ', y);
  return x + y;
}
add(5); // x:  5; y:  undefined; NaN 
```
### `arguments`
- > `arguments` is an `Array`-like object accessible inside functions that contains the values of the arguments passed to that function.

- > **Note**: If you're writing ES6 compatible code, then rest parameters should be preferred.

- > **Note**: “`Array`-like” means that arguments has a `length` property and properties indexed from zero, but it doesn't have `Array`'s built-in methods like `forEach` or `map`.

  See [Rest parameters](#rest-parameters) for more tails.

- `arguments` object is useful for definig *variadic functions*, i.e. functions that can be passed a variable number of arguments, such as `Math.min`

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)

- `arguments` object is not available in [arrow functions](#arrow-functions)

#### Example
```javascript
function max(/* ... */) {
  var max = Number.NEGATIVE_INFINITY;
  // Loop through the arguments, looking for, and remembering, the biggest.
  for (var i = 0; i < arguments.length; i++)
    if (arguments[i] > max) max = arguments[i];
  // Return the biggest
  return max;
}
var largest = max(1, 10, 100, 2, 3, 1000, 4, 5, 10000, 6); // => 10000
```
**Source**: *JavaScript: The Definitive Guide*, 6th Edition, David Flanagan

---
## IIFE (Immediately Invoked Function Expression)
@TODO

---
## The `Function` constructor
@TODO

---
## ES6 new features
### Arrow functions
### Rest parameters
Rest parameter syntax provides an alternative way of definig variadic functions (compare with the [`arguments`](#arguments) object).

#### Syntax
> A function definition's last parameter can be prefixed with "..." (...), which will cause all remaining (user supplied) parameters to be placed within a "standard" JavaScript array.
```javascript
function f(a, b, ...theArgs) {
  // ...
}
```
[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)

#### Important notes
- A function definition can have only one rest parameter.
- The rest parameter must be the last parameter in the function definition.
- Unlike the `arguments` object, rest parameters are `Array` instances, meaning methods like `sort`, `map`, `forEach` or `pop` can be applied on it directly.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)

#### Example
```javascript
function myFun(a,  b, ...manyMoreArgs) {
  console.log("a", a)
  console.log("b", b)
  console.log("manyMoreArgs", manyMoreArgs)
}

myFun("one", "two", "three", "four", "five", "six")

// Console Output:
// a, one
// b, two
// manyMoreArgs, ["three", "four", "five", "six"]
```
[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)

---
@TODO:
- function expression vs declaration
- Immediately Invoked Functions, arrow functions
- arguments object
- primitive vs object arguments
- arrow functions, this
- pure functions
- anonymous functions
- higher order functions
- toString
- currying
- constructors (more on that in the section about classes)
- eS6: default params, rest parameters

> A function without a return statement will return a default value. In the case of a constructor called with the new keyword, the default value is the value of its this parameter. For all other functions, the default return value is undefined.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions#the_function_constructor

> Primitive parameters (such as a number) are passed to functions by value; the value is passed to the function, but if the function changes the value of the parameter, this change is not reflected globally or in the calling function.

> If you pass an object (i.e. a non-primitive value, such as Array or a user-defined object) as a parameter and the function changes the object's properties, that change is visible outside the function,
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions


