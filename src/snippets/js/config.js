window.snippets = window.snippets || {};
window.snippets.config = window.snippets.config || {};
window.snippets.config.jsSnippets = {
  'Optional semicolon 1': `let a
a
=
3
console.log(a)`,

  'Optional semicolon 2': `function f() {
  return {js
    a: 5
  };
}

function g() {
  return
  {
    a: 5
  };
}

console.log('f():', f());
console.log('g():', g());`,

  'Prefix and postfix increment': `let a = 2;
let b = 2;
console.log(a++);
console.log(a);
console.log(++b);
console.log(b);`,

  'Object example': `let cat = {
  name: 'Fluffy',
  age: 2,
  owner: {
    firstname: 'John',
    lastname: 'Smith'
  }
};
console.log(cat.name);
console.log(cat.owner.lastname);`,

  'Function as an object': `function sayHello() {
  console.log('hello');
}
sayHello();
console.log('sayHello.name:', sayHello.name);
sayHello.newProperty = 'newValue';
console.log('sayHello.newProperty: ', sayHello.newProperty);
`,

  'Octal literals in strict mode': `'use strict';
let x = 03;`,
  'Falsy string': `let x = "";
if (x) {
    console.log('x is truthy!');
} else {
    console.log('x is falsy!');
}`,

  '&& operator': `let o = { x : 1 };
let p = null;
console.log('o && o.x:', o && o.x);
console.log('p && p.x:', p && p.x);`,

  '|| operator': `console.log('5 || "":', 5 || "");
console.log('0 || NaN:', 0 || NaN);`,
  '! operator': `let x =[0];
console.log('!!x: ', !!x);
let y = null;
console.log('!!y: ', !!y);`,
  'Logical operators precedence': `console.log(true || false && false);
console.log(true || (false && false));
console.log((true || false) && false);
`,
  'Variable declaration in a loop': `var o = {
  a: 1,
  b: 2,
  c: 3,
};
for (var p in o) {
  console.log(p);
}`,
  'Repeated declaration': `'use strict';
var x = 5;
var x = 'Hello';
console.log(x);`,
  'Undeclared variable error': `console.log(x);`,
  'Assignment to undeclated variable': `// 'use strict'
x = 5;
console.log(x);
`,
  'Function scope example 1': `function f() {
  var a = 'inner value';
  console.log('a inside of f:', a);
}
f();
console.log('a outside of f:', a);`,
  'Function scope example 2': `var x = 'outer';
function f() {
  var x = 'inner';
  console.log('x inside of f:', x);
}
f();
console.log('x outside of f:', x);`,
  'Function scope example 3': `var x = 'outer';
function f() {
  x = 'inner';
  console.log('x inside of f:', x);
}
f();
console.log('x outside of f:', x);`,
  'Nested functions': `var scope = 'global scope';
function f() {
  var scope = 'local scope';
  function g() {
    var scope = 'nested scope';
    console.log('scope from g:', scope);
  }
  g();
  console.log('scope from f:', scope);
}
f();
console.log('scope outside of f:', scope);
`,
  'Hoisting': `var scope = 'global';
function f() {
  console.log(scope);
  var scope = 'local';
  console.log(scope);
}
f();`,
  'Block vs function scope': `try {
  console.log('k before the function:', k);
} catch (error) {
  console.log('error: ', error);
}
function f(o) {
  console.log('k before the if block:', k);
  if (o) {
    var j = 0;
    console.log('k before the loop:', k);
    for (var k = 0; k < 10; k++) {
      console.log('k from the loop:', k);
    }
    console.log('k after the loop:', k);
  }
  console.log('j after the if block:', j);
}
f({});
`,
  // 'Global variables': `var x = 5;
  // y = 6;
  // console.log(window.x);
  // console.log(window.y);
  // console.log(delete window.x);
  // console.log(delete window.y);`
  'let - repeated declaration': `let x = 5;
let x = 'Hello';`,
  'let - block scope - 1': `let x = 1;
if (x === 1) {
  let x = 2;
  console.log(x);
}
console.log(x);`,
  'let - block scope - 2': `for (let i = 0; i < 10; i++) {
  console.log(i);
}
console.log('i after loop:', i);`,
  'let - global variable': `var x = 'global';
let y = 'global';
console.log(window.x);
console.log(window.y);`,
  'let - temporal dead zone': `let x = 'outer';
{
  console.log('x inside of f:', x);
  let x = 'inner';
}`,
  'let - temporal dead zone - typeof operator': `'use strict';
console.log(typeof undeclaredVariable);
console.log(typeof varVariable);
console.log(typeof letVariable);
let letVariable = 1;
var varVariable = 2;`,
  'var - functions in a loop': `var funcs = [];
for (var i = 0; i < 10; i++) {
  funcs.push(function() {
    console.log(i);
  });
}
funcs.forEach(function(func) {
  func();
});`,
  'var - functions in a loop - IIFE': `var funcs = [];
for (var i = 0; i < 10; i++) {
  funcs.push((function(value) {
    return function() {
      console.log(value);
    }
  }(i)));
}
funcs.forEach(function(func) {
  func();
});`,
  'let - functions in loop': `var funcs = [];
for (let i = 0; i < 10; i++) {
  funcs.push(function() {
    console.log(i);
  });
}
funcs.forEach(function(func) {
  func();
});`,
  'const - declaration without initialization': `const a;`,
  'const - value reassignment': `const a = 5;
a = 7;`,
  'const - object value modification': `const o = {
  a: 1
};
o.a = 2;
console.log(o);`,
  'const - variable declaration in a loop': `const array = ['a', 'b', 'c'];
for (const element of array) {
  console.log('first loop:', element);
} 

const o = {
  a: 1,
  b: 2,
  c: 3,
};
for (const p in o) {
  console.log('second loop:', p);
}

for (const i = 0; i  < array.length; i++) {
  console.log('third loop:', array[i]);
}`,
  'const - repeated declarations': `const x = 5;
var x = 'Hello';`,
  'const - block scope': `const x = 1;
if (x === 1) {
  const x = 2;
  console.log(x);
}
console.log(x);`,
  'const - global  variables': `var x = 'global';
const y = 'global';
console.log(window.x);
console.log(window.y);`,
  'const - temporal dead zone': `function f() {
  console.log('x: ', x);
  console.log('y: ', y);
  var x = 1;
  const y = 2;
}
f();`,
  'Object as a property name 1': `const o = {};
o.a = 1;
o['b'] = 2;
o[2] = 3;
o[{}] = 4;
console.log(JSON.stringify(o));`,
  'Object as a property name 2': `const dwayne = {}, daniel = { firstName: 'Daniel'}, jason = {key: 'jason'};

dwayne[daniel] = 123;
dwayne[jason] = 456;

console.log(dwayne[daniel]);`,
  'Accessor property': `const user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return \`\${this.name} \${this.surname}\`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};

user.fullName = "Alice Cooper";

console.log(user.name);
console.log(user.surname);
console.log(user.fullName);`,
  'Property attributes: writable': `const user = {};
Object.defineProperty(user, 'surname', {
  value: 'Jones',
  writable: false
});

console.log('user.surname before change:', user.surname);
user.surname = 'Smith'; 
console.log('user.surname after change:', user.surname);`,
  'Property attributes: enumerable': `const user1 = {};
Object.defineProperty(user1, 'name', {
  value: 'John',
  enumerable: true
});
Object.defineProperty(user1, 'surname', {
  value: 'Smith',
  enumerable: false
  });

for (const property in user1) {
  console.log(\`\${property}: \${user1[property]}\`);
} 

console.log('Object.keys(user1): ', Object.keys(user1));

const user2 = {
  age: 12
};

Object.assign(user2, user1);
console.log('user2: ', user2);

const user3 = {
  country: 'NL'
};

// spread operator
const user4 = { ...user3, ...user1 };
console.log('user4: ', user4);`,
  'Property attributes: configurable. 1': `const user = {};
Object.defineProperty(user, 'age', {
  get() { return 50; },
  configurable: false
});
try {
  Object.defineProperty(user, 'age', {
    configurable: true
  });
} catch (error) {
  console.error('error 1:', error);
}
try {
  Object.defineProperty(user, 'age', {
    enumerable: true
  });
} catch (error) {
  console.error('error 2:', error);
}
try {
  Object.defineProperty(user, 'age', {
    set() { }
  });
} catch (error) {
  console.error('error 3:', error);
}
try {
  Object.defineProperty(user, 'age', {
    get() { return 50; }
  });
} catch (error) {
  console.error('error 4:', error);
}
try {
  Object.defineProperty(user, 'age', {
    value: 12
  });
} catch (error) {
  console.error('error 5:', error);
}

console.log('user.age 1:', user.age);
delete user.age;
console.log('user.age 2:', user.age);`,
  'Property attributes: configurable. 2': `const user = {};
Object.defineProperty(user, 'name', {
  value: 'A',
  writable: true,
  configurable: false
});
user.name = 'B';
console.log(user.name);
Object.defineProperty(user, 'name', {
  value: 'C',
  writable: false,
});
user.name = 'D';
console.log(user.name);

Object.defineProperty(user, 'name', {
  writable: true,
});`,
  'Object.isExtensible': `const o = {};
console.log(Object.isExtensible(o));
o.x = 5;
console.log(o.x);`,
  'Object.preventExtensions 1': `const o = {};
Object.preventExtensions(o);
console.log(Object.isExtensible(o));
o.x = 5;
console.log(o.x);`,
  'Object.preventExtensions 2': `'use strict';
const o = {};
Object.preventExtensions(o);
console.log(Object.isExtensible(o));
o.x = 5;
console.log(o.x);`,
  'Object.seal 1': `const o = {
  x: 5
};

console.log(Object.isSealed(o));
Object.seal(o);
console.log(Object.isSealed(o));

o.x = 100;
o.y = 200;

console.log(o.x);
console.log(o.y);

console.log(delete o.x);
console.log(o.x);`,
  'Object.seal 2': `'use strict';  
const o = {
  x: 5
};

Object.seal(o);
o.x = 100;
o.y = 200;`,
  'Object.freeze 1': `const o = {
  x: 5
};

console.log(Object.isFrozen(o));
Object.freeze(o);
console.log(Object.isFrozen(o));

o.x = 100;
o.y = 200;

console.log(o.x);
console.log(o.y);

console.log(delete o.x);
console.log(o.x);`,
  'Object.freeze 2': ` 'use strict';  
const o = {
  x: 5
};

Object.freeze(o);
o.x = 100;`,
};

window.snippets.config.htmlSnippets = {
  selectors: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        .container {
          border: 1px solid #000;
          padding: 10px;
        }
  
  {{css}}
      </style>
    </head>
    <body>
      <div id="outer" class="container">
        outer div
        <div id="inner" class="container">
          inner div
        </div>
      </div>
      <p class="cat-container container">
        <img src="https://cataas.com/cat" alt="Random cat image" height="100">
        Meow!
      </p>
    </body>
    </html>`,
  pseudoclasses: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        .container {
          border: 1px solid #000;
          padding: 10px;
        }
  
{{css}}
      </style>
    </head>
    <body>
      <form>
        <label for="cat-name">Cat name:</label>
        <br>
        <input type="text" id="cat-name" name="cat-name" class="cat-input">
        <br>
        <label for="cat-breed">Cat breed:</label>
        <br>
        <input type="text" id="cat-breed" class="cat-input" name="cat-breed">
        <br>
        <button id="cat-submit">Submit</button>
      </form>
      <br>
      Armadillos eat:
      <ul>
        <li>ants</li>
        <li>beetles</li>
        <li>termites</li>
        <li>plants</li>
        <li>eggs</li>
        <li>small vertebrates</li>
        <li>some fruit</li>
      </ul>
    </body>
    </html>`,
  'pseudoclasses:link': `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        .container {
          border: 1px solid #000;
          padding: 10px;
        }
  
{{css}}
      </style>
    </head>
    <body>
      <a href="https://cataas.com/cat/gif"
      target="_blank"
      title="Random cat GIF">Cat as a service - GIF</a>
    </body>
    </html>`,
  pseudoelements: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        .ad-topbanner {
          display: inline-block;
          text-align: center;
        }
{{css}}
      </style>
    </head>
    
    <body>
      <div class="ad-topbanner">
        <div>
          <img height=500
            src="https://preview.redd.it/3jxc3xiau3u51.jpg?width=640&crop=smart&auto=webp&s=f9ccb03c74dc4b512a5323a03beed7daaba4e54b"
            alt="A cat in a box">
        </div>
      </div>
    
      <p>According to Wikipedia, <q cite="https://en.wikipedia.org/wiki/Armadillo#Defensive_behavior">The North American
          nine-banded armadillo tends to jump straight in the air when surprised.</q></p>
    
      <p class="diet-and-predation">Armadillos have very poor eyesight, and use their keen sense of smell to hunt for food. They use their claws for digging and finding food, as well as for making their homes in burrows. They dig their burrows with their claws, making only a single corridor the width of the animal's body. They have five clawed toes on their hind feet, and three to five toes with heavy digging claws on their fore feet</p>
    </body>
    </html>`,
  combinators: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        .container {
          border: 1px solid #000;
          margin: 15px;
        }

{{css}}
      </style>
    </head>
    
    <body>
      <div class="container" id="grandparent">
        Grandparent
        <div class="container" id="parent">
          Parent
          <div class="container" id="brother-1">
            Brother 1
          </div>
          <div class="container" id="sister-1">
            Sister 1
          </div>
          <div class="container" id="sister-2">
            Sister 2
          </div>
        </div>
      </div>
    
      <article class="card">
        <div class="Native_cards">
          <img src="https://www.thepaws.net/wp-content/uploads/2019/04/funny-cats.jpg" alt="Random cat image" height="300">
        </div>
        <footer>Cat selfie</footer>
      </article>
    </body>
    
    </html>`
};

window.snippets.config.cssHtmlSnippets = {
  'Universal selector 1': {
    css: `* {
  background-color: red;
}`,
    html: 'selectors',
  },
  'Universal selector 2': {
    css: `#outer > * {
  background-color: orange;
}`,
    html: 'selectors',
  },
  'Element selector': {
    css: `div {
  background-color: yellow;
}`, html: 'selectors',
  },
  'Class selector': {
    css: `.cat-container {
  background-color: green;
}`, html: 'selectors',
  },
  'Attribute selector': {
    css: `div[class] {
  background-color: blue;
}`, html: 'selectors',
  },
  'Attribute selector: =': {
    css: `div[class="container"] {
  background-color: purple;
}`, html: 'selectors',
  },
  'Attribute selector: ~=': {
    css: `[class~="container"] {
  background-color: red;
}`, html: 'selectors',
  },
  'Attribute selector: |=': {
    css: `p[class|="cat"] {
  background-color: pink;
}`, html: 'selectors',
  },
  'Attribute selector: ^=': {
    css: `p[class^="cat-co"] {
  background-color: purple;
}`, html: 'selectors',
  },
  'Attribute selector: $=': {
    css: `p[class$="ner"] {
  background-color: blue;
}`, html: 'selectors',
  },
  'Attribute selector: *=': {
    css: `p[class*="onta"] {
  background-color: green;
}`, html: 'selectors',
  },
  'Attribute selector: i': {
    css: `p[class*="NER" i] {
  background-color: blue;
}`, html: 'selectors',
  },
  'Id selector': {
    css: `#inner {
  background-color: yellow;
}`, html: 'selectors',
  },
  'Pseudo-class :focus': {
    css: `.cat-input:focus {
  background-color: purple;
}`, html: 'pseudoclasses',
  },
  'Pseudo-class :focus-within': {
    css: `form:focus-within {
  background-color: purple;
}`, html: 'pseudoclasses',
  },
  'Pseudo-class :focus-visible': {
    css: `#cat-submit:focus-visible {
  background-color: purple;
}`, html: 'pseudoclasses',
  },
  'Pseudo-classes: link': {
    css: `a {
  color: purple;
}
    
    
a:link {
  color: blue;
}
    
a:visited {
  color: green;
}
    
a:focus {
  color: yellow;   
}
    
a:hover {
  color: orange;
}
    
a:active {
  color: red;
}`, html: 'pseudoclasses:link',
  },
  'Pseudo-class :first-child': {
    css: `label:first-child {
  background-color: purple;
}`, html: 'pseudoclasses',
  },
  'Pseudo-class :first-of-type': {
    css: `input:first-of-type {
  background-color: purple;
}`, html: 'pseudoclasses',
  },
  'Pseudo-class :nth-child': {
    css: `li:nth-child(2n) {
  background-color: purple;
}`, html: 'pseudoclasses',
  },
  'Pseudo-class :not()': {
    css: `:not(button) {
  color: purple;
}`, html: 'pseudoclasses',
  },
  'pseudo-element ::before': {
    css: `.ad-topbanner:before {
    content: 'Advertisement';
}`,
    html: 'pseudoelements',
  },
  'pseudo-element ::first-line': {
    css: `.diet-and-predation::first-line {
  background-color: pink;
  color: red;
  font-size: 16px;
  text-decoration: underline;
  text-transform: capitalize;
}`,
    html: 'pseudoelements',
  },
  'combinator: descendant': {
    css: `#grandparent div {
  border: 1px solid red;
}`,
    html: 'combinators',
  },
  'combinator: child': {
    css: `#grandparent > div {
  border: 1px solid red;
}`,
    html: 'combinators',
  },
  'combinator: adjacent sibling': {
    css: `#brother-1 + #sister-1 {
  border: 1px solid red;
}`,
    html: 'combinators',
  },
  'combinator: general sibling': {
    css: `#brother-1 ~ #sister-2 {
  border: 1px solid red;
}`,
    html: 'combinators',
  },
  'combinator: real life example': {
    css: `.card .Native_cards:not([data-empty])~footer {
  display: none;
}`,
    html: 'combinators',
  },
};