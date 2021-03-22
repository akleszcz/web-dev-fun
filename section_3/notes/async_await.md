# `async` and `await`

Introduced in ECMAScript 2017, `async` and `await` are a syntactic sugar that allow us to write asynchronous code that looks and feels like a synchronous one.

## `async`

The `async` keyword is used to declare an asynchronous function.

### Syntax

- Function declaration

  ```javascript
  async function name([param[, param[, ...param]]]) {
    statements
  }
  ```

  [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

   - Example:
      ```javascript
      async function getTodo() {
        const todos = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        return todos;
      };
      ```

- Function expression
  ```javascript
  async function [name]([param1[, param2[, ..., paramN]]]) {
    statements
  }
  ```
  [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function)

  - Example 1:
    ```javascript
    const getTodo = async function () {
      const todos = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      return todos;
    };
    ```
  - Example 2:
    ```javascript
    const getTodo = async () => {
      const todos = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      return todos;
    };
    ```

An asynchronous function:

- always returns a promise:

  - Example 1:
    ```javascript
    const result = getTodo();
    console.log(result instanceof Promise); // true
    result.then(console.log); // Response {type: "basic", url: "https://jsonplaceholder.typicode.com/todos/1", redirected: false, status: 200, ok: true, …}
    ```
  - Example 2:
    ```javascript
    async function getNumber() {
      return 5;
    }
    const result = getNumber();
    console.log(result instanceof Promise); // true
    result.then(console.log); // 5
    ```
- is the only type of function that can contain the `await` keyword within its body:
  ```javascript
  function getTodo() {
    const todos = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    return todos;
  }; // Uncaught SyntaxError: await is only valid in async function
  ```
  > await only works inside async functions within regular JavaScript code, however it can be used on it's own with [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

  [Source](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)

## `await`
> Await expressions make promise-returning functions behave as though they're synchronous by suspending execution until the returned promise is fulfilled or rejected. The resolved value of the promise is treated as the return value of the await expression.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

## Error handling

Sources:

- [Making asynchronous programming easier with async and await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
- [async function
  ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [async function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function)
