# Iterators and generators

 Iterators and generators were introduced in ECMAScript 6.

 An iterator is any object that implements the **iterator** protocol described below.

 ## The iterator protocol

 > The iterator protocol defines a standard way to produce a sequence of values (either finite or infinite), and potentially a return value when all values have been generated.

 [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol)

 An object implements the iterator protocol, if:
 - it has a method called `next`, which:
   - takes zero or one argument (check [here](#note-passing-a-value-to-the-next-method) for more details),
   - returns an object with the following properties:
     - `done` - has the value `false` if the iterator was able to produce the next value in the sequence - this is equivalent to not specifying the `done` property altogether ([source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol))
     - `value` - the next appropriate value, if the iterator hasn't completed its sequence. Return value for the iterator otherwise (see the example below).

## Example iterator
```javascript
function createIterator(items) {
  let i = 0;
  return {
    next: function () {
      const done = (i >= items.length);
      const value = done ? undefined : items[i++];
      return {
        done,
        value,
      };
    }
  };
}

const iterator = createIterator(['Bamboo', 'constitutes about 95% of', `the red panda's diet`]);
console.log(iterator.next()); // {done: false, value: "Bamboo"}
console.log(iterator.next()); // {done: false, value: "constitutes about 95% of"}
console.log(iterator.next()); // {done: false, value: "the red panda's diet"}

console.log(iterator.next()); // {done: true, value: undefined}
console.log(iterator.next()); // {done: true, value: undefined}
console.log(iterator.next()); // {done: true, value: undefined}
 ```
 [Source of the fun fact about red pandas](https://nationalzoo.si.edu/animals/red-panda)

## Use cases
> While it is easy to imagine that all iterators could be expressed as arrays, this is not true. Arrays must be allocated in their entirety, but iterators are consumed only as necessary. Because of this, iterators can express sequences of unlimited size, such as the range of integers between `0` and `Infinity`.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)

Example:
```javascript
function getIntegersIterator() {
  let value = 0;

  const integersIterator = {
    next: function () {
      const result = { value, done: false }
      value += 1;
      return result;
    }
  };
  return integersIterator;
}
```
## Generator functions
**Generator functions** allow us to define iterators without the need to explicitly maintain their internal state:

> When called, generator functions do not initially execute their code. Instead, they return a special type of iterator, called a **Generator**.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)

### Syntax
```javascript
function* name([param[, param[, ... param]]]) {
   statements
}
```
[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

Note that:
> It doesn’t matter if the asterisk is directly next to `function`
or if some whitespace is between it and the * character.

**Source**: *Understanding ECMAScript 6: The Definitive Guide for JavaScript Developers*, Nicholas C. Zakas, p. 140

Therefore
```javascript
function * name([param[, param[, ... param]]]) {
   statements
}
```
and
```javascript
function *name([param[, param[, ... param]]]) {
   statements
}
```
are valid syntax too.

### The `yield` keyword

The `yield` keyword was also introduced in ECMAScript 6.

It can be used only inside a generator function:
```javascript
function* g1() {
  yield 1;
}

function * g2() {
  yield 1;
}

function *g3() {
  yield 1;
}

function f() {
  yield 1; // Uncaught SyntaxError: Unexpected number
}
```
Using `yield` inside a function that is inside a generator causes an error as well:
```javascript
function* f(items) {
  items.forEach(function(item) {
    yield item + 1; // Uncaught SyntaxError: Unexpected identifier
  });
}
```
A similar code, using `for` loop instead of `forEach` method works fine:
```javascript
function* g(items) {
  for (let i = 0; i < items.length; i++) {
    yield items[i] + 1;
  }
}
```
So how does the `yield` keyword work? As mentioned above, calling a generator function returns an iterator object. This object behaves as described below:
> The `yield`
keyword (...) specifies values the resulting iterator
should return when `next()` is called and the order in which they should be
returned.

**Source**: *Understanding ECMAScript 6: The Definitive Guide for JavaScript Developers*, Nicholas C. Zakas, p. 140

> The `yield` keyword pauses generator function execution and the value of the expression following the `yield` keyword is returned to the generator's caller. (...) Once paused on a `yield` expression, the generator's code execution remains paused until the generator's `next()` method is called. Each time the generator's `next()` method is called, the generator resumes execution (...).

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield#description)

Example:
```javascript
function* g(items) {
  for (let i = 0; i < items.length; i++) {
    yield items[i] + 1;
  }
}

const iterator = g([1, 2, 3]);
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: 4, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
```
---
#### Note: passing a value to the `next` method
> If an optional value is passed to the generator's `next()` method, that value becomes the value returned by the generator's current `yield` operation.
>
> (...)
>
> **Warning**: Unfortunately, `next()` is asymmetric, but that can’t be helped: It always sends a value to the currently suspended `yield`, but returns the operand of the following `yield`.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield#description)

> When using a generator as an observer, it is important to note that the only purpose of the first invocation of `next()` is to start the observer. It is only ready for input afterwards, because this first invocation advances execution to the first `yield`. Therefore, any input you send via the first `next()` is ignored (...).

[Source](https://exploringjs.com/es6/ch_generators.html#sec_generators-as-observers)


Example 1:
```javascript
function* g() {
  console.log(`First yield result: ${yield 100}`);
  console.log(`After first yield`);
  console.log(`Second yield result: ${yield 200}`);
  console.log(`After second yield`);
}
const iterator = g();
iterator.next(1);
// {value: 100, done: false}
iterator.next(2);
// First yield result: 2
// After first yield
// {value: 200, done: false}
iterator.next(3);
// Second yield result: 3
// After second yield
// {value: undefined, done: true}
```
What happens here is that:
1. When the `next` method is called for the first time (`iterator.next(1)`), it returns the operand of the first `yield` (`100`) and the generator body is paused. The value passed to `next` (`1`) is ignored;
2. When the `next` method is called for the second time (`iterator.next(2)`), the value passed to `next` (`2`) is used as the return value of the `yield` expression the generator is currently suspended on (`yield 100`). Therefore, `First yield result: 2` is logged to the console. The generator's body is then executed until the next `yield` expression (`yield 200`). The value of this expression is returned by the current `next` method call, so `{value: 200, done: false}` is logged to the console.
3. Similarly, when the `next` method is called for the third time (`iterator.next(3)`), `3` is returned by the `yield 200` expression and `Second yield result: 3` is logged to the console, followed by `After second yield`. Since there are no more `yield`s and no value is returned with a `return` statement, `next` returns `{value: undefined, done: true}`.

See [this thread](https://stackoverflow.com/questions/44246673/es6-generators-mechanism-first-value-passed-to-next-goes-where) for comparison.

Example 2:
```javascript
function* counter(value) {
 let step;

 while (true) {
   step = yield ++value;

   if (step) {
     value += step;
   }
 }
}

const generatorFunc = counter(0);
console.log(generatorFunc.next().value);   // 1
console.log(generatorFunc.next().value);   // 2
console.log(generatorFunc.next().value);   // 3
console.log(generatorFunc.next(10).value); // 14
console.log(generatorFunc.next().value);   // 15
console.log(generatorFunc.next(10).value); // 26
```
[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield#examples)

---