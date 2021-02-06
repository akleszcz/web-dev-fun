# Functions parameters

## The number of function's parameters in JS
> JavaScript function definitions do not specify an expected type for the function parameters, and function invocations do not do any type checking on the argument values
you pass. In fact, JavaScript function invocations do not even check the number of
arguments being passed.

**Source**: *JavaScript: The Definitive Guide*, 6th Edition, David Flanagan

### Example
```javascript
function add(x, y) {
  return x + y;
}
add(5, 7, 9, 11); // no error; result: 12
```

> When a function is invoked with fewer arguments than declared parameters, the additional parameters are set to the `undefined` value. 

**Source**: *JavaScript: The Definitive Guide*, 6th Edition, David Flanagan

### Example
```javascript
function add(x, y) {
  console.log('x: ', x);
  console.log('y: ', y);
  return x + y;
}
add(5); // x:  5; y:  undefined; NaN 
```
## The `arguments` object
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

## Rest parameters
Rest parameter syntax provides an alternative way of definig variadic functions (compare with the [`arguments`](#arguments) object).

### Syntax
> A function definition's last parameter can be prefixed with "..." (...), which will cause all remaining (user supplied) parameters to be placed within a "standard" JavaScript array.
```javascript
function f(a, b, ...theArgs) {
  // ...
}
```
[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)

### Important notes
- A function definition can have only one rest parameter.
- The rest parameter must be the last parameter in the function definition.
- Unlike the `arguments` object, rest parameters are `Array` instances, meaning methods like `sort`, `map`, `forEach` or `pop` can be applied on it directly.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)

### Example
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

## Default parameters
### Syntax
```javascript
function [name]([param1[ = defaultValue1 ][, ..., paramN[ = defaultValueN ]]]) {
   statements
}
```
[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)

### The old way of definig default parameters...
> ```javascript
> // Append the names of the enumerable properties of object o to the
> // array a, and return a. If a is omitted, create and return a new array.
> function getPropertyNames(o, /* optional */ a) {
>   if (a === undefined) a = []; // If undefined, use a new array
>   for(var property in o) a.push(property);
>   return a;
> }
> // This function can be invoked with 1 or 2 arguments:
> var a = getPropertyNames(o); // Get o's properties into a new array
> getPropertyNames(p, a); // append p's properties to that array
> ```
> Instead of using an if statement in the first line of this function, you can use the ||
operator in this idiomatic way:
> ```javascript
> a = a || [];
> ```

**Source**: *JavaScript: The Definitive Guide*, 6th Edition, David Flanagan, p. 171

> ```javascript
> function makeRequest(url, timeout, callback) {
>   timeout = timeout || 2000;
>   callback = callback || function() {};
>   // the rest of the function
> }
> ```
> (...) a flaw exists with this approach in
that a valid value for timeout might actually be 0, but this would replace it with 2000 because 0 is falsy.

**Source**: *Understanding ECMAScript 6: The Definitive Guide for JavaScript Developers*, Nicholas C. Zakas, p. 36

### ...and the new way
```javascript
> function getPropertyNames(o, /* optional */ a = []) {
>   for(var property in o) a.push(property);
>   return a;
> }
> // This function can be invoked with 1 or 2 arguments:
> var a = getPropertyNames(o); // Get o's properties into a new array
> getPropertyNames(p, a);
```
### Notes
- By default, all function parameters default to `undefined`.
  
  Example:
  ```javascript
  function sayHello(name) {
    console.log(`Hello, ${name}!`);
  }
  sayHello();
  ```

- Setting parameter's value explicitly to `undefined` triggers its default value just like not passing it at all does. No other value, truthy or falsy, does that.

  Example:
  ```javascript
  function sayHello(name = 'world') {
    console.log(`Hello, ${name}!`);
  }
  sayHello(); // Hello, world!
  sayHello(undefined); // Hello, world!
  sayHello(null); // Hello, null!
  sayHello(0); // VM58:2 Hello, 0!
  sayHello({}); // Hello, [object Object]!
  sayHello([]); // Hello, !
  ```

- It's possible to definde parameters without default values after the ones with default values:
  Example:
  ```javascript
  function sayHello(name = 'world', lastname) {
    console.log(`Hello, ${name} ${lastname}!`);
  }
  sayHello(); // Hello, world undefined!
  sayHello('John'); // Hello, John undefined!
  sayHello('John', 'Smith'); // Hello, John Smith!
  ```

- > Parameters defined earlier (to the left) are available to later default parameters

  [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)

  Example:
  ```javascript
  function sayHello(name = 'world', lastname = `${name}son`) {
    console.log(`Hello, ${name} ${lastname}!`);
  }
  sayHello(); // Hello, world worldson!
  sayHello('John'); // Hello, John Johnson!
  sayHello('John', 'Smith'); // Hello, John Smith!
  ```
- > (...) the default value need not be a primitive value. You can, for example, execute a function to retrieve the default parameter value, like this:
  > ```javascript
  > function getValue() {
  >   return 5;
  > }
  > function add(first, second = getValue()) {
  >   return first + second;
  > }
  > console.log(add(1, 1)); // 2
  > console.log(add(1)); // 6
  > ```
  > (...)   Keep in mind that `getValue()` is called only when `add()` is called without a second parameter, not when the function declaration is fist parsed. That means if `getValue()` were written differently, it could potentially return a different value. For instance:
  > ```javascript
  > let value = 5;
  > function getValue() {
  >   return value++;
  > }
  > function add(first, second = getValue()) {
  >   return first + second;
  > }
  > console.log(add(1, 1)); // 2
  > console.log(add(1)); // 6
  > console.log(add(1)); // 7
  > ```

  **Source**: *Understanding ECMAScript 6: The Definitive Guide for JavaScript Developers*, Nicholas C. Zakas, p. 41