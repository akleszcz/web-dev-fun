# Promises

> The `Promise` object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

A `Promise` is always in one of three states:
- pending
- fulfilled
- rejected

If a `Promise` is fulfilled or rejected, but not pending, it is said to be *settled*.

## The `Promise` constructor
A new, unsettled `Promise` can be defined with the `Promise` constructor like this:
```javascript
function sleep(nbrOfSeconds, shouldFail) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (shouldFail) {
        reject(new Error(`Rejected after ${nbrOfSeconds} second(s)`));
      } else {
        resolve(`Resolved after ${nbrOfSeconds} second(s)`);
      }
    }, nbrOfSeconds * 1000);
  });
}
```
The constructor takes one argument - a function called the *executor*. The *executor* accepts two parameters:
- a function called if
 the executor has finished successfully. This parameter is usually called *`resolve`*,
 - a function called if
 the executor has failed. This parameter is usually called *`reject`*.

While it is not obligatory to call the parameters `resolve` and `reject`, it is a very popular convention and linters can be configured to enforce it.

---
### Note: rejecting with errors

As you can see in the example above, the `Promise` instance returned by the `sleep` function rejects with an `Error` intance, rather than with a string containing the error message. This is considered a good practice, because:

> otherwise, the part doing the catching would have to perform checks to see if the argument was a string or an error, and you might lose valuable information like stack traces.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)
## Appending rejection and fulfillment handlers
The following three `Promise` instance methods can be used to handle a `Promise`'s results:

### `then`
Takes two parameters:
- a fulfillment handler
- a rejection handler

Example:
```javascript
sleep(1, false)
  .then((result) => {
    console.log('result: ', result);
  }, (error) => {
    console.error('error: ', error)
  }); // result:  Resolved after 1 second(s)

sleep(1, true)
  .then((result) => {
    console.log('result: ', result);
  }, (error) => {
    console.error('error: ', error)
  }); // error:  Error: Rejected after 1 second(s)
```
---
### Note
It is a common practice to pass only the first parameter (so the fulfillment handler) to `then`, and handle rejection errors with [`catch`](#catch).

### `catch`
> It behaves the same as calling `Promise.prototype.then(undefined, onRejected)` (in fact, calling `obj.catch(onRejected)` internally calls `obj.then(undefined, onRejected)`).

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

Example:
```javascript
sleep(1, true)
  .then((result) => {
    console.log('result: ', result);
  })
  .catch((error) => {
    console.error('error: ', error)
  }); // VM178:6 error:  Error: Rejected after 1 second(s)
```

### `finally`
Appends a handler that is called when the promise is settled (whether fulfilled or rejected). This helps to avoid code duplication in both `then` and `catch` handlers.

Examples:
```javascript
let isPromiseSettled = false;
sleep(1, false)
  .finally(() => {
    isPromiseSettled = true;
    console.log('isPromiseSettled: ', isPromiseSettled); // isPromiseSettled:  true
  });
```
```javascript
let isPromiseSettled = false;
sleep(1, true)
  .finally(() => {
    isPromiseSettled = true;
    console.log('isPromiseSettled: ', isPromiseSettled); // isPromiseSettled:  true
  });
```
This can be useful e.g. for hiding a loader on a page after data fetching is finished (either with success or error). 

All three of the methods above return new `Promise` instances, which can be chained. Thanks to that, callback hell of nested function calls mentioned in [The Callback Pattern](./asynchronous_programming#callback-hell) can be replaced by a flattened, more readable `Promise` chain:
```javascript
method1()
  .then(() => method2())
  .then(() => method3())
  .then(() => method4())
  .then(() => method5())
  .catch(err => throw err);
```
which can be shortened to:
```javascript
method1()
  .then(method2)
  .then(method3)
  .then(method4)
  .then(method5)
  .catch(err => throw err);
```
See the `read-file.js` and `read-file-promisified.js` files in the `examples` directory of this section for a comparison of a callback and `Promise` approach of reading files.

## Creating already settled promises
You can create `Promise` objects that are resolved or rejected with `Promise.resolve` and `Promise.reject` methods, respectively.

Examples:
```javascript
const p = Promise.resolve('According to Wikipedia, "the name Firefox was said to be derived from a nickname of the red panda"');
p.then(console.log);
```
```javascript
const p = Promise.reject(new Error('I reject!'));
p.catch(console.error);
```
This syntax is useful e.g. for mocking functions that return promises in unit tests:
```javascript
jest.spyOn(utils, 'fetchXml').mockImplementationOnce(() => Promise.resolve(XML_MOCK));

```

---
### Note: `Promise` handlers execution
> Once a Promise is fulfilled or rejected, the respective handler function (onFulfilled or onRejected) will be called asynchronously (scheduled in the current thread loop).

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

Example:
```javascript
console.log(1);
setTimeout(() => console.log(2));
Promise.resolve().then(() => console.log(3));
console.log(4);
```
Result:
```
1
4
3
2
```
Notice how `console.log(3)` from promise fulfillment handler is called after synchronous `console.log(4)`, but before `console.log(2)` from `setTimeout`. This happens, because promises callbacks are added to a special *microtask* queue. 
You can read more about microtasks [here](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide).

---

## Handling errors
Catching an error in the `Promise` chain allows the rest of the chain to still be executed. Consider the following example:
```javascript
function fail() {
  return new Promise(function (resolve, reject) {
    reject(new Error('I reject!'));
  });
}

function succeed() {
  return new Promise(function (resolve, reject) {
    resolve('I succeed!');
  });
}

fail()
  .catch(console.error)
  .then(succeed)
  .then(console.log);
```
and compare it with a one where `fail` function's error is caught at the end of the chain like this:
```javascript
fail()
  .then(succeed)
  .then(console.log)
  .catch(console.error);
```
In the first case, the rejection handler is defined before the fullfilment handlers. Thanks to that, the fullfilment handlers are executed and `succeed` function's result is logged to the console. 

In the second case, the error is caught after the fullfilment handlers are added to the `Promise` chain. Because of that, the fullfilment handlers are not executed.

---
### Note: code execution after `resolve` or `reject`
Consider the following example:
```javascript
const p = new Promise(function(resolve, reject) {
  resolve(5);
  console.log('I am still executed!');
});
console.log('After promise');

p.then(result => console.log('Result: ', result));
```
It produces the following result in the console:
```
I am still executed!
After promise
Result:  5
```
As you can see, `console.log('I am still executed!')` was called, even though it is defined after `resolve`. This happened, because `resolve` and `reject` don't terminate function execution, like a `return` statement or throwing an error do. If we don't want function execution to continue after `resolve`, we have to call `return` explicitly like this:
```javascript
const p = new Promise(function(resolve, reject) {
  resolve(5);
  return;
  console.log('I am still executed!');
});
console.log('After promise');

p.then(result => console.log('Result: ', result));
```
or like this:
```javascript
const p = new Promise(function(resolve, reject) {
  return resolve(5);
  console.log('I am still executed!');
});
console.log('After promise');

p.then(result => console.log('Result: ', result));
```
This fact is useful e.g. if we want to implement a *cache and revalidate* pattern. Imagine the following scenario: we want to fetch a value from a remote server and save it to localStorage. The value may change from time to time, but it is not crucial for us to return the updated value every single time. What's more important is to return the value as fast as possible to avoid slowing down the page.
Therefore, we use the following strategy:
- we implement a function that returns a promise resolving with the value,
- *cache*: the function checks if the value is already stored in localStorage. If it is, then it resolves with it. If not, then it doesn't resolve yet. In both cases it goes to the next step,
- *revalidate*: the function fetches the value from the server and saves it to localStorage. If the value has been updated, the new value will be returned by the next function call.

This strategy could be implemented like this:
```javascript
const p = new Promise(function (resolve, reject) {
  const cachedValue = localStorage.getItem('cachedValue');
  if (cachedValue) {
    resolve(cachedValue);
  }
  fetch('https://api.mocki.io/v1/0350b5d5')
    .then((response) => response.json())
    .then((updatedValue) => {
      console.log('Updating cached value...');
      localStorage.setItem('cachedValue', JSON.stringify(updatedValue));
      resolve(updatedValue);
    })
    .catch(reject);
});

p.then(result => console.log('Result: ', result));
```
Note how `resolve(cachedValue);` will return the value from localStorage (if found), but `fetch` will still be called and a new value will be saved to localStorage. However, the function will resolve with `updatedValue` only if it didn't resolve with `cachedValue` earlier.

Other interesting facts that can be observed in the first example:
```javascript
const p = new Promise(function(resolve, reject) {
  resolve(5);
  console.log('I am still executed!');
});
console.log('After promise');

p.then(result => console.log('Result: ', result));
```
are that:
- synchronous code passed to `Promise` executor function is executed synchronously: `I am still executed!` is logged before `After promise`. The fullfilment handler, however, is executed asynchronously, as mentioned in [Promise handlers execution](#note-promise-handlers-execution). So, if we modified the example above to look like this:
  ```javascript
  const p = new Promise(function(resolve, reject) {
    resolve(5);
    console.log('I am still executed!');
  });
  p.then(result => console.log('Result: ', result));
  console.log('After promise');
  ```
we would see the following result in the console (notice how `Result: 5` is logged after `After promise`):
```
I am still executed!
After promise
Result:  5
```

- `then` can be called on an already resolved promise. It will receive the value the promise resolved with as an argument.

## Passing values in `Promise` chains


As mentioned in [Appending rejection and fulfillment handlers](#appending-rejection-and-fulfillment-handlers), each of the `then`, `catch` and `finally` methods returns a new `Promise` instance. This is done based on the following rules:

### `then`
> If a handler function:
> - returns a value, the promise returned by `then` gets resolved with the returned value as its value.

Example:
```javascript
const p1 = Promise.resolve();
const p2 = p1.then(() => 2);
p2.then((value) => console.log('p2 resolved with: ', value));
```

> - doesn't return anything, the promise returned by then gets resolved with an undefined value.

Example:
```javascript
const p1 = Promise.resolve(1);
const p2 = p1.then((value) => { console.log('p1 resolved with: ', value); }); 
p2.then((value) => console.log('p2 resolved with: ', value));
```

> - throws an error, the promise returned by then gets rejected with the thrown error as its value.

Examples:
```javascript
const p1 = Promise.resolve();
const p2 = p1.then(() => {
  throw new Error('I throw an error!');
});
p2.catch((error) => console.error('p2 error: ', error));
```
```javascript
const p1 = Promise.resolve();
const p2 = p1.then(() => {
  JSON.parse('Invalid JSON string');
});
p2.catch((error) => console.error('p2 error: ', error));
```

> - returns an already fulfilled promise, the promise returned by then gets fulfilled with that promise's value as its value.

Example:
```javascript
const p1 = Promise.resolve();
const af = Promise.resolve(5); // already fulfilled promise
const p2 = p1.then(() => af);
p2.then((value) => console.log('p2 resolved with: ', value));
```

> - returns an already rejected promise, the promise returned by then gets rejected with that promise's value as its value.

Example:
```javascript
const p1 = Promise.resolve();
const ar = Promise.reject(new Error('I reject!')); // already rejected promise
const p2 = p1.then(() => ar);
p2.catch((value) => console.log('p2 rejected with: ', value));
```

> - returns another pending promise object, the resolution/rejection of the promise returned by then will be subsequent to the resolution/rejection of the promise returned by the handler. Also, the resolved value of the promise returned by then will be the same as the resolved value of the promise returned by the handler.

Example:
```javascript
const p1 = fetch('https://jsonplaceholder.typicode.com/todos').then(response => response.json()); // fetch all todos
const p2 = p1.then((todos) => {
  const firstTodoId = todos[0].id;
  return fetch(`https://jsonplaceholder.typicode.com/todos/${firstTodoId}`)
});
p2
  .then(response => response.json())
  .then((value) => console.log('p2 resolved with: ', value));
```

[Source (of the bullet point descriptions)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

### `catch`
> Internally calls `Promise.prototype.then` on the object upon which it was called, passing the parameters `undefined` and the received `onRejected` handler. Returns the value of that call, which is a `Promise`.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

## Handling multiple promises
There are several static methods defined on the `Promise` constructor that let us handle an array (or more generally: an [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol)) of promises. All of them return a single promise. 

These methods are:
- `Promise.all` - 
  > returns a single Promise that resolves to an array of the results of the input promises. This returned promise will resolve when all of the input's promises have resolved, or if the input iterable contains no promises. It rejects immediately upon any of the input promises rejecting or non-promises throwing an error, and will reject with this first rejection message / error.

  [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

  ### Return value
  > - An **already resolved** Promise if the iterable passed is empty.

  Example:
  ```javascript
  const p = Promise.all([]);
  p.then((result) => console.log('Result: ', result));
  console.log(p);
  // Promise {<fulfilled>: Array(0)}
  // Result: []
  ```
  > - An **asynchronously resolved** Promise if the iterable passed contains no promises. Note, Google Chrome 58 returns an already resolved promise in this case.

  Example:
  ```javascript
  const p = Promise.all([
    123,
    'According to WWF, pandas need at least 2 different bamboo species in their range to avoid starvation',
  ]);
  p.then((result) => console.log('Result: ', result));
  console.log(p);
  setTimeout(() => console.log(p));

  // Promise {<pending>}
  // Result:  (2) [123, "According to WWF, pandas need at least 2 different bamboo species in their range to avoid starvation"]
  // Promise {<fulfilled>: Array(2)}
  ```

  > - A **pending** Promise in all other cases. This returned promise is then resolved/rejected **asynchronously** (as soon as the stack is empty) when all the promises in the given iterable have resolved, or if any of the promises reject. (...) Returned values will be in order of the Promises passed, regardless of completion order.

  Example 1:
  ```javascript
  Promise.all([sleep(2), sleep(1), sleep(5)])
    .then((result) => console.log('Result: ', result));
  // Result: ["Resolved after 2 second(s)", "Resolved after 1 second(s)", "Resolved after 5 second(s)"]
  ```

  Example 2:
  ```javascript
  Promise.all([sleep(2), 1, sleep(5)])
    .then((result) => console.log('Result: ', result));
  // Result: ["Resolved after 2 second(s)", 1, "Resolved after 5 second(s)"]
  ```

  Example 3:
  ```javascript
  Promise.all([sleep(2, true), sleep(1), sleep(5)])
    .then((result) => console.log('Result: ', result))
    .catch((error) => console.error('Error: ', error));
  // Error:  Error: Rejected after 2 second(s)
  ```

  Example 4:
  ```javascript
  Promise.all([sleep(2, true), sleep(1, true), sleep(5, true)])
    .then((result) => console.log('Result: ', result))
    .catch((error) => console.error('Error: ', error));
  // Error:  Error: Rejected after 1 second(s)
  ```

  [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all#return_value)

  ---
  ### Note 1
  Sometimes you may want to make sure that the promise returned by `Promise.all` will always be resolved rather than rejected. To achieve that, you can handle possible rejections with `catch` in the promises array:

  ```javascript
  Promise.all([
    sleep(2, true).catch(console.error),
    sleep(1, true).catch(console.error),
    sleep(5, true).catch(console.error),
  ])
    .then((result) => console.log('Fulfillment handler called with result: ', result))
    .catch((error) => console.error('Rejection handler called with error: ', error));
  //Error: Rejected after 1 second(s)
  // Error: Rejected after 2 second(s)
  // Error: Rejected after 5 second(s)
  // Fulfillment handler called with result: [undefined, undefined, undefined]
  ```

  ### Note 2
  Note that even if `Promise.all` rejects, because one of the promises in the array rejected, the rest of the promises won't be *cancelled*. Consider the following example:
  ```javascript
  function sleep(nbrOfSeconds, shouldFail) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (shouldFail) {
          const errorMsg = `Rejected after ${nbrOfSeconds} second(s)`;
          console.error(errorMsg);
          reject(new Error(errorMsg));
        } else {
          const msg = `Resolved after ${nbrOfSeconds} second(s)`;
          console.log(msg);
          resolve(msg);
        }
      }, nbrOfSeconds * 1000);
    });
  }

  Promise.all([sleep(0, true), sleep(2)])
    .then((result) => console.log('Result: ', result))
    .catch((error) => console.error('Error: ', error));

  // Rejected after 0 second(s)
  // Error:  Error: Rejected after 0 second(s)
  // Resolved after 2 second(s)
  ```
`Resolved after 2 second(s)` is still logged in the console, even though the promise returned by `Promise.all` has already rejected.
- `Promise.race`- 
  > returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise.

  [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

  ### Return value
  - A forever pending promise if the iterable passed is empty.

  Example:
  ```javascript
  const p = Promise.race([]);
  console.log('p: ', p);
  setTimeout(function(){
    console.log('p:', p);
  });
  p
    .then(() => console.log('resolved')) // will never be called
    .catch(() => console.error('rejected')); // will never be called
  ```
  - > If the iterable contains one or more non-promise value and/or an already settled promise, then Promise.race will resolve to the first of these values found in the iterable.

  [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

  Examples:
  ```javascript
  const p = Promise.race([Promise.resolve(1), Promise.resolve(2)]);
    console.log('p: ', p);
  setTimeout(function(){
    console.log('p:', p);
  });
  p
    .then((result) => console.log('result:', result))
    .catch((error) => console.error('error:', error));

  // p: Promise {<pending>}
  // result: 1
  // p: {<fulfilled>: 1} 
  ```

  ```javascript
  const p = Promise.race([Promise.resolve(1), 'just a string']);
    console.log('p: ', p);
  setTimeout(function(){
    console.log('p:', p);
  });
  p
    .then((result) => console.log('result:', result))
    .catch((error) => console.error('error:', error));

  // p: Promise {<pending>}
  // result: 1
  // p: {<fulfilled>: 1} 
  ```

  ```javascript
  const p = Promise.race(['just a string', Promise.resolve(1)]);
    console.log('p: ', p);
  setTimeout(function(){
    console.log('p:', p);
  });
  p
    .then((result) => console.log('result:', result))
    .catch((error) => console.error('error:', error));

  // p: Promise {<pending>}
  // result: just a string
  // Promise {<fulfilled>: "just a string"}
  ```
  ```javascript
  const p = Promise.race([sleep(2), Promise.resolve(1)]);
    console.log('p: ', p);
  setTimeout(function(){
    console.log('p:', p);
  });
  p
    .then((result) => console.log('result:', result))
    .catch((error) => console.error('error:', error));

  // p: Promise {<pending>}
  // result: 1
  // p: Promise {<fulfilled>: 1}
  ```

  - > a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects

  [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

  ```javascript
  const p = Promise.race([sleep(2), sleep(1, true)]);
  console.log('p: ', p);
  p
    .then((result) => console.log('result:', result))
    .catch((error) => console.error('error:', error));
  
  // p: Promise {<pending>}
  // error: Error: Rejected after 1 second(s) at <anonymous>:5:16
  ```
  Note that the first promise (`[sleep(2)`) will still resolve, even if `Promise.race` won't return its resolve value (notice how `'I am about to resolve.'` message added to the `sleep` method is still logged):
  ```javascript
  function sleep(nbrOfSeconds, shouldFail) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (shouldFail) {
          console.log('I am about to reject.');
          reject(new Error(`Rejected after ${nbrOfSeconds} second(s)`));
        } else {
          console.log('I am about to resolve.');
          resolve(`Resolved after ${nbrOfSeconds} second(s)`);
        }
      }, nbrOfSeconds * 1000);
    });
  }

    const p = Promise.race([sleep(2), sleep(1, true)]);
    console.log('p: ', p);
    p
      .then((result) => console.log('result:', result))
      .catch((error) => console.error('error:', error));
  
  // p: Promise {<pending>}
  // I am about to reject.
  // error: Error: Rejected after 1 second(s) at <anonymous>:6:16
  // I am about to resolve.
  ```

  
- `Promise.allSettled` 
  > returns a promise that resolves after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.

  [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

  ### Return value
  - > (...) **if and only if** an empty iterable is passed as an argument, `Promise.allSettled()` returns a `Promise` object that has **already been resolved** as an empty array.

    [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

  Example:
  ```javascript
  const p = Promise.allSettled([]);
  p.then((result) => console.log('Result: ', result));
  console.log(p);
  // Promise {<fulfilled>: Array(0)}
  // Result: []
  ```

  - > A pending Promise that will be asynchronously fulfilled once every promise in the specified collection of promises has completed, either by successfully being fulfilled or by being rejected.

  [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

  Example:
  ```javascript
  const p = Promise.allSettled([sleep(2), sleep(1, true), sleep(4, true), sleep(3)]);
  console.log('p: ', p);
  p
    .then((result) => console.log('result:', result))
    .catch((error) => console.error('error:', error));

  /* Promise {<pending>}
     result: [
      {
        "status": "fulfilled",
        "value": "Resolved after 2 second(s)"
      },
      {
        "status": "rejected",
        "reason": {
          "message": "Rejected after 1 second(s)",
          "stack": "Error: Rejected after 1 second(s)\n    at <anonymous>:5:16"
        }
      },
      {
        "status": "rejected",
        "reason": {
          message: "Rejected after 4 second(s)",
          "stack": "Error: Rejected after 4 second(s)\n    at <anonymous>:5:16"
        }
      },
      {
        "status": "fulfilled",
        "value": "Resolved after 3 second(s)"
      }
    ]
  */
  ```

- `Promise.any`
  - > as soon as one of the promises in the iterable fulfills, returns a single promise that resolves with the value from that promise. If no promises in the iterable fulfill (if all of the given promises are rejected), then the returned promise is rejected with an AggregateError, a new subclass of Error that groups together individual errors.

  [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)

  ### Return value
  - > An already rejected Promise if the iterable passed is empty.

  [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)

  Example:
  ```javascript
  const p = Promise.any([]);
  p.then((result) => console.log('Result: ', result))
  .catch((error) => console.log('Error: ', error));
  console.log(p);
  // Promise {<rejected>: AggregateError: All promises were rejected}
  // Error: AggregateError: All promises were rejected
  ```

  - > An asynchronously resolved Promise if the iterable passed contains no promises.

  [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)

  Example:
  ```javascript
  const p = Promise.any(['one', 2]);
  p.then((result) => console.log('Result: ', result))
  .catch((error) => console.log('Error: ', error));
  console.log(p);
  // Promise {<pending>}
  // Result: one
  ```

  - > A pending Promise in all other cases. This returned promise is then resolved/rejected asynchronously (as soon as the stack is empty) when any of the promises in the given iterable resolve, or if all the promises have rejected.
    >
    > (...)
    >
    > The returned promise is fulfilled with the first resolved value (or non-promise value) in the iterable passed as the argument, whether or not the other promises have rejected.

  [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)

  Example:
  ```javascript
  Promise.any([sleep(2), sleep(1), sleep(5)]).then((result) => console.log('Result: ', result));

  Promise.any([sleep(2), sleep(1, true), sleep(5)]).then((result) => console.log('Result: ', result));

  Promise.any([sleep(2), 1, sleep(5)]).then((result) => console.log('Result: ', result));

  Promise.any([sleep(2, true), sleep(1), sleep(5)])
    .then((result) => console.log('Result: ', result))
    .catch((error) => console.error('Error: ', error));

  Promise.any([sleep(2, true), sleep(1, true), sleep(5, true)])
    .then((result) => console.log('Result: ', result))
    .catch((error) => console.error('Error: ', error));
  
  // Result: 1
  // Result:  Resolved after 1 second(s)
  // Result:  Resolved after 1 second(s)
  // Result:  Resolved after 2 second(s)
  // Error:  AggregateError: All promises were rejected
  ```

@TODO
- reject vs throw

@TOREAD:
https://www.imaginea.com/the-javascript-event-loop-micro-tasks-and-macro-tasks/
https://michael-pautov.medium.com/micro-and-macro-tasks-in-javascript-4c556a3ea18c
