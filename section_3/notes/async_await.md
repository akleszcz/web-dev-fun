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
        const todo = await fetch('https://api.mocki.io/v1/0350b5d5');
        return todo;
      };
      ```

- Function expression
  ```javascript
  async function [name]([param1[, param2[, ..., paramN]]]) {
    statements
  }
  ```
  [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function)
  
  Or using arrow function syntax:
    ```javascript
  async ([param1[, param2[, ..., paramN]]]) => {
    statements
  }
  ```

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

The `await` keyword can therefore be used instead of the `then` method of a `Promise` instance:

- Example 1 - using `then`:
  ```javascript
  getTodo()
    .then(todo => console.log('todo: ', todo));
  ```

 - Example 2 - using `await`:
      ```javascript
      const todo = await getTodo()
      console.log('todo: ', todo);
      ```
## Error handling
@TODO

## Asynchronous functions in loops
In the examples, we will use the following function to mock an external API returning time (in minutes) spent on a given task:
```javascript
function getTimeSpent(taskId) {
  return new Promise(function (resolve, reject) {
    setTimeout(function() {
      switch(taskId) {
        case 1:
          return resolve(40);
        case 2:
          return resolve(120);
        case 3:
          return resolve(150);
        default:
          return reject(new Error('Id not found'));
      }
    }, 1000);
  });
}
```
and the following list of tasks:
```javascript
const myTasks = [
  {
    id: 1,
    description: 'feeding pandas',
  },
  {
    id: 2,
    description: 'playing with red pandas',
  },
  {
    id: 3,
    description: 'dancing with armadillos',
  },
];
```

- `for` loop:
  - Example:
    ```javascript
    async function logTimes(tasks) {
      console.log('Before async loop');

      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const time = await getTimeSpent(task.id);
        console.log(`Time spent on ${task.description}: `, time);
      }
      
      console.log('After async loop');
    }

    await logTimes(myTasks);
    ```
  - Result:
    ```
    Before async loop
    Time spent on feeding pandas:  40
    Time spent on playing with red pandas:  120
    Time spent on dancing with armadillos:  150
    After async loop
    ```
    As expected, *After async loop* is logged after all the asynchronous calls are resolved within the loop.
- `Array` methods:
  - `forEach`:
    - Example:
      ```javascript
      function logTimes(tasks) {
        console.log('Before async loop');

        tasks.forEach(async function(task) {
          const time = await getTimeSpent(task.id);
          console.log(`Time spent on ${task.description}: `, time);
        });
        
        console.log('After async loop');
      }

      logTimes(myTasks);
      ```
    - Result:
      ```
      Before async loop
      After async loop
      Time spent on feeding pandas:  40
      Time spent on playing with red pandas:  120
      Time spent on dancing with armadillos:  150
      ```
      As you can see, *After async loop* text is logged before task times. This happens, because:
      > **forEach expects a synchronous function** `forEach` does not wait for promises.

      [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

      Note that while `await` is technically used inside of the `logTimes` function's body and `logTimes` is not defined as `async`, there is no error saying that *await is only valid in async function* . It's only the anonymous callback function passed to `forEach` that has to be `async`:
      ```javascript
      tasks.forEach(function(task) {
        const time = await getTimeSpent(task.id);
        console.log(`Time spent on ${task.description}: `, time);
      }); // Uncaught SyntaxError: await is only valid in async function
      ```
      Trying to await the whole `tasks.forEach` call doesn't change `console.log` commands execution order:
      ```javascript
      async function logTimes(tasks) {
        console.log('Before async loop');

        await tasks.forEach(async function(task) {
          const time = await getTimeSpent(task.id);
          console.log(`Time spent on ${task.description}: `, time);
        });
        
        console.log('After async loop');
      }

      await logTimes(myTasks);
      // Result:
      // Before async loop
      // After async loop
      // Time spent on feeding pandas:  40
      // Time spent on playing with red pandas:  120
      ```
      To solve this problem, we can use `map` instead.
  - `map`:
    - > The `map()` method **creates a new array** populated with the results of calling a provided function on every element in the calling array.

      [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
    - Since an `async` function always returns a `Promise` instance, passing an `async` callback to `map` will result in an array of promises:
      ```javascript
      function logTimes(tasks) {
        console.log('Before async loop');

        const result = tasks.map(async function(task) {
          const time = await getTimeSpent(task.id);
          console.log(`Time spent on ${task.description}: `, time);
          return time;
        });
        
        console.log('After async loop');
        return result;
      }

      console.log('logTimes result: ', logTimes(myTasks));
      // Result:
      // Before async loop
      // After async loop
      // logTimes result:  (3) [Promise, Promise, Promise]
      // Time spent on feeding pandas:  40
      // Time spent on playing with red pandas:  120
      // Time spent on dancing with armadillos:  150
      ```
      As you can see, task times are still logged after the text *After async loop*. This can be fixed by awaiting **all** the promises returned by `map`. To achieve this, we can use the [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) method:
      ```javascript
      async function logTimes(tasks) {
        console.log('Before async loop');

        const resultPromises = tasks.map(async function(task) {
          const time = await getTimeSpent(task.id);
          console.log(`Time spent on ${task.description}: `, time);
          return time;
        });
        const result = await Promise.all(resultPromises);
        console.log('After async loop');
        return result;
      }

      console.log('logTimes result: ', await logTimes(myTasks));
      // Result:
      // Before async loop
      // Time spent on feeding pandas:  40
      // Time spent on playing with red pandas:  120
      // Time spent on dancing with armadillos:  150
      // After async loop
      // logTimes result:  (3) [40, 120, 150]
      ```

  - `filter`

Sources:

- [Making asynchronous programming easier with async and await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
- [async function
  ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [async function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function)
- [JavaScript async and await in loops](https://zellwk.com/blog/async-await-in-loops/)
- [How to use async functions with Array.forEach in Javascript](https://advancedweb.hu/how-to-use-async-functions-with-array-foreach-in-javascript/)
