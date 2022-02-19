
This mini-project demonstrates TypeScript's compile-time checking.
In order to use it, you have to:
- install TypeScript locally by running:
```
npm install
```
- compile the `.ts` script from `src` directory to a `.js` script in `dist` directory with:
```
npm run compile:ts
```
- open `index.html` in the browser to see the compiled script working.

In `src/runtime-vs-compile-time-checking.ts` you will find commented-out instructions that would cause compile-time error, but work fine during runtime (you can check it by calling them directly in the browser).

You can also see how the result code differs with
```json
"target": "es5"
 ```
and
```json
"target": "es6"
```
in `compilerOptions` defined in `tsconfig.json` (e.g. compare variable declarations with `var` and `const`).

