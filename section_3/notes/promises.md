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
        reject(new Error(`Rejected after ${nbrOfSeconds} seconds`));
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
  }); // VM178:6 error:  Error: Rejected after 1 seconds
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
In the first case, the rejection handler is defined before the fullfilment handlers. Thanks to that, the fullfilment handlers are executed and `succeed`'s function result is logged to the console. 

In the second case, the error is caught after the fullfilment handlers are added to the `Promise` chain. Because of that, the fullfilment handlers are not executed.

## Passing values in `Promise` chains

As mentioned in [Appending rejection and fulfillment handlers](#appending-rejection-and-fulfillment-handlers), each of the `then`, `catch` and `finally` methods returns a new `Promise` instance. This is done based on the following rules:

### `then`
> If a handler function:
> - returns a value, the promise returned by then gets resolved with the returned value as its value.
> - doesn't return anything, the promise returned by then gets resolved with an undefined value.
> - throws an error, the promise returned by then gets rejected with the thrown error as its value.
> - returns an already fulfilled promise, the promise returned by then gets fulfilled with that promise's value as its value.
> - returns an already rejected promise, the promise returned by then gets rejected with that promise's value as its value.
> - returns another pending promise object, the resolution/rejection of the promise returned by then will be subsequent to the resolution/rejection of the promise returned by the handler. Also, the resolved value of the promise returned by then will be the same as the resolved value of the promise returned by the handler.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

### `catch`
> Internally calls Promise.prototype.then on the object upon which it was called, passing the parameters undefined and the received onRejected handler. Returns the value of that call, which is a Promise.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catchs)

@TODO
- adding handlers to an already fullfilled Promise
- then on already resolved Promises
- then, catch, finally return types
- finally details
- Keep in mind that the executor runs immediately when readFile() is
called. When either resolve() or reject() is called inside the executor, a job
is added to the job queue to resolve the promise.
- Promise.all, race, allSettled
- reject vs throw
