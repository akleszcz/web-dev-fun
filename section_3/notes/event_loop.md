# Concurrency model and the event loop

JavaScript concurrency model in the browser consists of the following elements:
- **call stack** - contains stack *frames*. Each frame represents a function call and its arguments values. The stack therefore keeps track of where we are in the code. Also called a LIFO (Last In First Out) queue
- **heap** - a region of memory where our program's data (e.g. variables values, user defined functions etc.) is allocated;
- **callback (message) queue** - a queue containing some of the asynchronous code to be executed when the call stack is empty
- **job (microtasks) queue** - an additional queue, used e.g. by JavaScript promises and the Mutation Observer API to run their callbacks ([source](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide))
- **Browser (Web) APIs** - 
  > (...) built on top of the core JavaScript language, providing you with extra superpowers to use in your JavaScript code

  [Source](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)

  Example Web API functions: [fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch), [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout).

# Example:
Consider the code below:
```javascript
setTimeout(() => console.log('from setTimeout'), 0);
console.log('from outside of setTimeout');
  ```
If you run it, e.g. in a browser's console, you will see the following messages logged as a result:
```
from outside of setTimeout
from setTimeout
```
As you can see, the `console.log` instruction defined outside of `setTimeout` was run first, even thought it appears later in the code. This is because  `setTimeout`'s delay (of 0 ms, but still) is handled by Browser API. After the delay time passes, `setTimeout`'s callback is added to the callback queue.

While the timer runs in the browser, `console.log('from outside of setTimeout');` is pushed to the call stack. Only after it is executed and the call stack is empty, `setTimeout`'s callback from the callback queue can be pushed to the call stack and exexuted. 

Based on:
- *Concurrency model and the event loop*, https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop
- *JavaScript Event Loop Explained*, https://medium.com/front-end-weekly/javascript-event-loop-explained-4cd26af121d4
- *Javascript Fundamentals — Call Stack and Memory Heap*, https://medium.com/@allansendagi/javascript-fundamentals-call-stack-and-memory-heap-401eb8713204   
- *Understanding Event Loop, Call Stack, Event & Job Queue in Javascript*, https://medium.com/@Rahulx1/understanding-event-loop-call-stack-event-job-queue-in-javascript-63dcd2c71ecd
- *JavaScript job queue and microtasks*, https://careersjs.com/magazine/javascript-job-queue-microtask/