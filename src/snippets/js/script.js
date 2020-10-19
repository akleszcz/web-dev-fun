(function () { // Use IIFE to avoid polluting the global scope.
  var selectedIndexStorageKeyJs = 'selected-js-snippet-index';
  // get DOM elements
  var jsSnippetPre = document.getElementById('js-snippet-pre');
  var executeJsBtn = document.getElementById('execute-js-btn');
  var jsSnippetsSelect = document.getElementById('js-snippets-select');
  var tryItIframe = document.getElementById('try-it-ifr');

  var cssSnippetPre = document.getElementById('css-snippet-pre');
  var htmlSrcPre = document.getElementById('html-src-pre');
  var applyCssBtn = document.getElementById('apply-css-btn');
  var cssSnippetsSelect = document.getElementById('css-snippets-select');

  var selectedIndexStorageKeyCss = 'selected-css-snippet-index';


  // define data (hard-coded for now)
  // @TODO: group select options with optgroup
  var jsSnippets = {
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

  var cssSnippets = {
    'Universal selector 1': `* {
  background-color: red;
}`,
    'Universal selector 2': `#outer > * {
  background-color: orange;
}`,
    'Element selector': `div {
  background-color: yellow;
}`,
    'Class selector': `.cat-container {
  background-color: green;
}`,
    'Attribute selector': `div[class] {
  background-color: blue;
}`,
    'Attribute selector: =': `div[class="container"] {
  background-color: purple;
}`,
    'Attribute selector: ~=': `[class~="container"] {
  background-color: red;
}`,
    'Attribute selector: |=': `p[class|="cat"] {
  background-color: pink;
}`,
    'Attribute selector: ^=': `p[class^="cat-co"] {
  background-color: purple;
}`,
    'Attribute selector: $=': `p[class$="ner"] {
  background-color: blue;
}`,
    'Attribute selector: *=': `p[class*="onta"] {
  background-color: green;
}`,
    'Attribute selector: i': `p[class*="NER" i] {
  background-color: blue;
}`,
    'Id selector': `#inner {
  background-color: yellow;
}`,
    'Pseudo-class :focus': `.cat-input:focus {
  background-color: purple;
}`,
    'Pseudo-class :focus-within': `form:focus-within {
  background-color: purple;
}`,
    'Pseudo-class :focus-visible': `#cat-submit:focus-visible {
  background-color: purple;
}`,
    'Pseudo-class :first-child': `label:first-child {
  background-color: purple;
}`,
    'Pseudo-class :first-of-type': `input:first-of-type {
  background-color: purple;
}`,
    'Pseudo-class :not()': `:not(button) {
  color: purple;
}`,
  };

  var getHtmlSrc = function (cssRules) {
    return `<!DOCTYPE html>
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

${cssRules.replace(/^/gm, '      ')}
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
  </body>
  </html>`;
  }

  // define functions

  // use configuration object pattern
  function populateSnippetsSelect(params) {
    Object.keys(params.snippets).forEach(function (title, index) {  // The Object.keys() method returns an array of a given object's own enumerable property names
      var snippetOption = document.createElement('option');
      snippetOption.value = 'snippet-' + index;
      snippetOption.textContent = title;
      params.snippetsSelect.appendChild(snippetOption); // @TODO: consider using DocumentFragment instead
    })
  };

  function fillSnippetPre(params) {
    var selectedSnippetTitle = params.snippetsSelect.options[params.selectedIndex].textContent;
    var selectedSnippet = params.snippets[selectedSnippetTitle];
    params.snippetPre.textContent = selectedSnippet;
    prettyPrint(params.snippetPre);
  }

  function prettyPrint(element) {
    element.classList.remove('prettyprinted');
    PR.prettyPrint();
  }

  function handleSnippetChange(params) {
    var selectedIndex = params.snippetsSelect.selectedIndex;
    localStorage.setItem(params.selectedIndexStorageKey, selectedIndex);
    fillSnippetPre({
      snippetsSelect: params.snippetsSelect,
      snippetPre: params.snippetPre,
      snippets: params.snippets,
      selectedIndex: selectedIndex
    })
  }

  function executeJs() {
    console.clear();
    var command = jsSnippetPre.textContent;
    // it is disadvised to use eval for real life applications
    window.eval(command); // indirect eval call to execute code globally
  }

  function applyCss() {
    var cssRules = cssSnippetPre.textContent;
    var htmlSrc = getHtmlSrc(cssRules);
    htmlSrcPre.textContent = htmlSrc;
    renderHtml(htmlSrc);
    prettyPrint(htmlSrcPre);
  }

  function getBlobUrl(src) {
    const blob = new Blob([src], { type: 'text/html' });
    return URL.createObjectURL(blob)
  }

  function renderHtml(src) {
    tryItIframe.src = getBlobUrl(src);
  }

  function handleDomElements(type) {
    var btn, btnClickHandler, snippetsSelect, snippetPre, snippets, selectedIndexStorageKey;

    switch (type) {
      case 'css':
        btn = applyCssBtn;
        snippetsSelect = cssSnippetsSelect;
        snippetPre = cssSnippetPre;
        snippets = cssSnippets;
        selectedIndexStorageKey = selectedIndexStorageKeyCss;
        btnClickHandler = applyCss;
        break;
      case 'js':
        btn = executeJsBtn;
        snippetsSelect = jsSnippetsSelect;
        snippetPre = jsSnippetPre;
        snippets = jsSnippets;
        selectedIndexStorageKey = selectedIndexStorageKeyJs;
        btnClickHandler = executeJs;
        break;
    }

    btn.addEventListener('click', btnClickHandler);
    // To be updated to ES6 syntax later
    populateSnippetsSelect({ snippetsSelect: snippetsSelect, snippets: snippets });
    var selectedIndex = localStorage.getItem(selectedIndexStorageKey) || 0;
    snippetsSelect.selectedIndex = selectedIndex;

    // To be updated to ES6 syntax later
    fillSnippetPre({
      snippetsSelect: snippetsSelect,
      snippetPre: snippetPre,
      snippets: snippets,
      selectedIndex: selectedIndex
    });

    snippetsSelect.addEventListener('change', function () {
      handleSnippetChange({
        snippetsSelect: snippetsSelect,
        snippetPre: snippetPre,
        snippets: snippets,
        selectedIndexStorageKey: selectedIndexStorageKey
      });
    });
  }

  function init() {
    handleDomElements('css');
    handleDomElements('js');
    applyCss();
  }

  init();

})();