In order to use `runtime-vs-compile-time-checking.ts`, you have to have TypeScript installed:
``` 
npm install -g typescript
```
If you have an outdated version, you can update it with:
```
npm install -g typescript@latest
```
You can check what the latest version is with:
```
npm info typescript version
```
You can check your currently installed version with:
```
tsc -v
```

When you have the latest TypeScript version installed, you can transpile `runtime-vs-compile-time-checking.ts` to `runtime-vs-compile-time-checking.js` with:
```
tsc path/to/file
```
e.g.:
```
tsc src/typescript/runtime-vs-compile-time-checking.ts
``` 
This will generate a JS script that you can run with:
``` 
node path/to/file
```
e.g.:
```
node src/typescript/runtime-vs-compile-time-checking.js
```
or include with a `script` tag in `index.html` and see it working in the browser.

In `runtime-vs-compile-time-checking.ts` you will find commented-out instructions that would cause compile-time error, but work fine during runtime (you can check it by calling them directly in the browser).