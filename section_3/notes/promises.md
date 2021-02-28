# Promises

> The `Promise` object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

A `Promise` is always in one of three states:
- pending
- fulfilled
- rejected

If a `Promise` is fulfilled or rejected, but not pending, it is said to be *settled*.

## The Promise constructor
A new, unsettled `Promise` can be defined with the `Promise` constructor like this:
```javascript
function sleep(nbrOfSeconds, shouldFail) {
  return new Promise(function (resolve, reject) {
    if (shouldFail) {
      reject(new Error(`Rejected after ${nbrOfSeconds} seconds`));
    } else {
      resolve(`Resolved after ${nbrOfSeconds} second(s)`);
    }
  });
}
```
The constructor takes one argument - a function called the *executor*. The *executor* accepts two parameters:
- a function called if
 the executor has finished successfully. This parameter is usually called *`resolve`*,
 - a function called if
 the executor has failed. This parameter is usually called *`reject`*.

While it is not obligatory to call the parameters `resolve` and `reject`, it is a very popular convention and linters can be configured to enforce it.

## Appending rejection and fulfillment handlers
The following three `Promise` instance methods can be used to handle a `Promise`'s results:

### `then`
Takes two parameters:
- a fulfillment handler
- a rejection handler

Examlple:
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
sleep(1, false)
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
  .then((result) => {
    console.log('result: ', result);
  })
  .catch((error) => {
    console.error('error: ', error)
  })
  .finally(() => {
    isPromiseSettled = true;
    console.log('isPromiseSettled: ', isPromiseSettled); // isPromiseSettled:  true
  });
```
```javascript
let isPromiseSettled = false;
sleep(1, true)
  .then((result) => {
    console.log('result: ', result);
  })
  .catch((error) => {
    console.error('error: ', error)
  })
  .finally(() => {
    isPromiseSettled = true;
    console.log('isPromiseSettled: ', isPromiseSettled); // isPromiseSettled:  true
  });
```
This can be useful e.g. for hiding a loader on a page after data fetching is finished (either with success or error). 

All three of the methods above return new `Promise` instances. Thanks to that, they can be chained:
```javascript
@TODO
```

@TODO
- the constructor
- then (with 1 and 2 args)
- catch
- adding handlers to an already fullfilled Promise
- chaining
- then on already resolved Promises
- finally
- Keep in mind that the executor runs immediately when readFile() is
called. When either resolve() or reject() is called inside the executor, a job
is added to the job queue to resolve the promise.
- Promise.all, race, allSettled
