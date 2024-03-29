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

- > **Note**: "`Array`-like" means that `arguments` has a `length` property and properties indexed from zero, but it doesn't have `Array`'s built-in methods like `forEach` or `map`.

  See [Rest parameters](#rest-parameters) for more details.

- `arguments` object is useful for definig *variadic functions*, i.e. functions that can be passed a variable number of arguments, such as `Math.min`

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)

- `arguments` object is not available in arrow functions

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
Rest parameter syntax provides an alternative way of definig variadic functions (compare with [the `arguments` object](#the-arguments-object)).

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
- Unlike the `arguments` object, rest parameters are `Array` instances, meaning methods like `sort`, `map`, `forEach` or `pop` can be applied on them directly.

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
that a valid value for `timeout` might actually be 0, but this would replace it with 2000 because 0 is falsy.

**Source**: *Understanding ECMAScript 6: The Definitive Guide for JavaScript Developers*, Nicholas C. Zakas, p. 36

### ...and the new way
```javascript
function getPropertyNames(o, /* optional */ a = []) {
  for (var property in o) a.push(property);
  return a;
}
 // This function can be invoked with 1 or 2 arguments:
 var a = getPropertyNames(o); // Get o's properties into a new array
 getPropertyNames(p, a);
```
### Notes
- By default, all function parameters default to `undefined`.

  Example:
  ```javascript
  function sayHello(name) {
    console.log(`Hello, ${name}!`);
  }
  sayHello(); // Hello, undefined!
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
  sayHello(0); // Hello, 0!
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
  sayHello(undefined, 'Smith'); // Hello, world Smith!
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
  > (...)   Keep in mind that `getValue()` is called only when `add()` is called without a second parameter, not when the function declaration is first parsed. That means if `getValue()` were written differently, it could potentially return a different value. For instance:
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

## Primitive and object parameters
> Arguments are passed to functions by value. If the function changes the value of an argument, this change is not reflected globally or in the calling function. However, object references are values, too, and they are special: if the function changes the referred object's properties, that change is visible outside the function (...).

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)

> Javascript always passes by value. However, if you pass an object to a function, the "value" is really a reference to that object, so the function can modify that object's properties but not cause the variable outside the function to point to some other object.

[Source](https://stackoverflow.com/questions/6605640/javascript-by-reference-vs-by-value)

### Example 1
```javascript
const ourTeamName = 'Commercial';

function rebrand(name, newName) {
  name = newName;
  return name;
}

console.log('ourTeamName before rebranding:', ourTeamName); // ourTeamName before rebranding: Commercial
const ourNewTeamName = rebrand(ourTeamName, 'Admadillos');
console.log('ourTeamName after rebranding:', ourTeamName); // ourTeamName after rebranding: Commercial
console.log('ourNewTeamName:', ourNewTeamName); // ourNewTeamName: Admadillos
```

### Example 2
```javascript
const ourTeam = {
  name: 'Commercial'
};

function rebrand(team, newName) {
  team.name = newName;
  return team;
}

console.log('ourTeam before rebranding:', ourTeam); // ourTeam before rebranding: {name: "Commercial"}
const ourNewTeam = rebrand(ourTeam, 'Admadillos');
console.log('ourTeam after rebranding:', ourTeam); // ourTeam after rebranding: {name: "Admadillos"}
console.log('ourNewTeam:', ourNewTeam); // ourNewTeam: {name: "Admadillos"}
console.log('ourTeam === ourNewTeam:', ourTeam === ourNewTeam); // ourTeam === ourNewTeam: true
```

### Example 3
```javascript
const ourTeam = {
  name: 'Commercial'
};

function rebrand(team, newName) {
  team = {
    name: newName
  };
  return team;
}

console.log('ourTeam before rebranding:', ourTeam); // ourTeam before rebranding: {name: "Commercial"}
const ourNewTeam = rebrand(ourTeam, 'Admadillos');
console.log('ourTeam after rebranding:', ourTeam); // ourTeam after rebranding: {name: "Commercial"}
console.log('ourNewTeam:', ourNewTeam); // ourNewTeam: {name: "Admadillos"}
console.log('ourTeam === ourNewTeam:', ourTeam === ourNewTeam); // ourTeam === ourNewTeam: false
```

## Configuration object pattern
> The configuration object pattern is a way to provide cleaner APIs, especially if you’re building a library or any other code that will be consumed by other programs.

[Source](https://www.oreilly.com/library/view/javascript-patterns/9781449399115/ch04.html)

### Idea

> Passing a large number of parameters is not convenient. A better approach is to substitute all the parameters with only one and make it an object.

[Source](https://www.oreilly.com/library/view/javascript-patterns/9781449399115/ch04.html)

### Example
This example is based on [Chapter 4. Functions - Configuration Objects](https://www.oreilly.com/library/view/javascript-patterns/9781449399115/ch04.html) from *JavaScript Patterns* by Stoyan Stefanov.

Let's say we want to define a function with the following personal details as parameters:
- `first` - required,
- `last` - required,
- `dob` - required,
- `gender` - optional,
- `address` - optional.

Let's say that later we need to add another required parameter called `username`.

**Without the pattern used**

The function is first defined like this:

```javascript
function addPerson(first, last, dob, gender, address) {...}
```

and called like this (assuming that values for the optional parameters are not provided):
```javascript
addPerson("Bruce", "Wayne", new Date());
```

After the `username` parameter is added, the function looks like this:

```javascript
function addPerson(first, last, dob, gender, address, username) {...}
```

and has to be called like this (again, assuming that values for the optional parameters are not provided):

```javascript
addPerson("Bruce", "Wayne", new Date(), undefined, undefined, "batman");
```

As you can see, we now have to pass even the optional parameters and be careful not to mix the parameters' order.

**With the pattern used**

Instead of having multiple parameters, we can have only one, named `config`, that is expected to be an object. This object's properties will contain values for all the personal details that our function needs:
```javascript
function addPerson(config) {...}
```
Then our function can be called like this:
```javascript
var config = {
    username: "batman",
    first: "Bruce",
    last: "Wayne"
};
addPerson(config);
```

### Pros
- allows for a cleaner programming interface
- no need to remember the order of the parameters
- optional parameters can be safely skipped

### Cons
- > you need to remember the names of the parameters
- > property names cannot always be safely minified, especially by simpler minifiers

Source: *JavaScript Patterns: Build Better Applications with Coding and Design Patterns*, 1st Edition, Stoyan Stefanov, p. 8-84

### Note
If we develop a library and decide to add a required parameter to one of its functions, like in the example above, it means we introduce a breaking change. This means that we cannot ensure backward compatibility for existing implemenentations and should inform the users about it, e.g. by increasing the major version of our library if [semver](https://semver.org/) is used.

With this breaking change, we could theoretically change the order of our function's params, since its existing calls need to be updated to provide a value the new required param anyway.

Therefore, instead of this:

```javascript
function addPerson(first, last, dob, gender, address, username) {...}
```

we could have this:

```javascript
function addPerson(first, last, dob, username, gender, address) {...}
```

and call it like this:
```javascript
addPerson("Bruce", "Wayne", new Date(), "batman");
```
without explicitly setting optional params to `undefined`.

However, this creates a risk that some of the existing function calls will still work, even though they will now pass values to different parameters that they were meant to. This will make it more difficult to detect the problem.

For example, if an existing implementation of our library contained a function call like this:
```javascript
addPerson("Bruce", "Wayne", new Date(), "male");
```
it wouldn't throw an error after the breaking change was introduced, but it would incorrectly assign the value `male` to `username`, instead of `gender`.

## Destructuring function parameters
> The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

This feature was introduced in ES6.

### Example
Instead of defining a function like this:
```javascript
function addPerson(config) {
  const first = config.first;
  const last = config.last;
  const dob = config.dob;
  const gender = config.gender;
  const address = config.address;
  ...
}
```

we can do it like this:

```javascript
function addPerson({ first, last, dob, gender, address }) {
  ...
}
```

Both versions would be called in the same manner:

```javascript
addPerson({
    username: "batman",
    first: "Bruce",
    last: "Wayne"
});
```

Any params with values unspecified in the configuration object will be set to `undefined`. Any additional properties in the configuration object will be ignored (by "additional" we mean the ones whose names are not in the list of function's destructured params).
