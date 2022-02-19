# Asynchronous programming background

The following mechanisms have been used for a long time in JavaScript to handle asynchronous actions:

## The Event Model
Used to allow user interaction, e.g. by calling a function when a button is clicked:
```javascript
const btn = document.getElementById('click-me-btn');
btn.addEventListener('click', function(event) {
  console.log('Thank you for clicking me! Event details: ', event);
});
```

## The Callback Pattern
> ```javascript
> readFile("example.txt", function(err, contents) {
>  if (err) {
>    throw err;
>  }
>  console.log(contents);
> });
> console.log("Hi!"); //  console.log("Hi!") is output immediately after readFile() is called, before console.log(contents) prints anything
> ```
> This example uses the traditional Node.js error-fist callback style. The
readFile() function is intended to read from a file on disk (specifid as the
fist argument) and then execute the callback (the second argument) when
complete. If there’s an error, the err argument of the callback is an error
object; otherwise, the contents argument contains the file contents as a
string.

Source: *Understanding ECMAScript 6: The Definitive Guide for JavaScript Developers*, Nicholas C. Zakas

If we want to chain multiple calls together. we can quickly find ourselves in a **callback hell**:
> ```javascript
> method1(function (err, result) {
>   if (err) {
>     throw err;
>   }
>   method2(function (err, result) {
>     if (err) {
>       throw err;
>     }
>     method3(function (err, result) {
>       if (err) {
>         throw err;
>       }
>       method4(function (err, result) {
>         if (err) {
>           throw err;
>         }
>         method5(result);
>       });
>     });
>   });
> });
> ```

Source: *Understanding ECMAScript 6: The Definitive Guide for JavaScript Developers*, Nicholas C. Zakas

This and other problems can be resolved with [ES6 Promises](./promises).