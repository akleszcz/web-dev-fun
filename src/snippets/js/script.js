(function () { // Use IIFE to avoid polluting the global scope.
  var selectedIndexStorageKey = 'selected-snippet-index';
  // get DOM elements
  var snippetPre = document.getElementById('snippet');
  var executeBtn = document.getElementById('execute-btn');
  var snippetsSelect = document.getElementById('snippets-select');
  // define code snippets
  // @TODO: group select options with optgroup
  var snippets = {
    'Optional semicolon 1': `let a
a
=
3
console.log(a)`,

    'Optional semicolon 2': `function f() {
  return {
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
'Repeated declaration - let': `let x = 5;
let x = 'Hello';`, 
'Block scope - let - 1': `let x = 1;
if (x === 1) {
  let x = 2;
  console.log(x);
}
console.log(x);`,
'Block scope - let - 2': `for (let i = 0; i < 10; i++) {
  console.log(i);
}
console.log('i after loop:', i);`,
'Global variables - let': `var x = 'global';
let y = 'global';
console.log(window.x);
console.log(window.y);`,
'Hoisting - let': `let x = 'outer';
{
  console.log('x inside of f:', x); // Uncaught ReferenceError: Cannot access 'x' before initialization
  let x = 'inner';
}`,
'Temporal dead zone - typeof operator': `'use strict';
console.log(typeof undeclaredVariable);
console.log(typeof varVariable);
console.log(typeof letVariable);
let letVariable = 1;
var varVariable = 2;`,
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
  };

  // define functions
  function executeSnippet() {
    console.clear();
    var command = snippetPre.textContent;
    // it is disadvised to use eval for real life applications
    window.eval(command); // indirect eval call to execute code globally
  }

  function populateSnippetsSelect() {
    Object.keys(snippets).forEach(function (title, index) {  // The Object.keys() method returns an array of a given object's own enumerable property names
      var snippetOption = document.createElement('option');
      snippetOption.value = 'snippet-' + index;
      snippetOption.textContent = title;
      snippetsSelect.appendChild(snippetOption); // @TODO: consider using DocumentFragment instead
    })
  };

  function fillSnippetPre(selectedIndex) {
    var selectedSnippetTitle = snippetsSelect.options[selectedIndex].textContent;
    var selectedSnippet = snippets[selectedSnippetTitle];
    snippetPre.textContent = selectedSnippet;
    snippetPre.classList.remove('prettyprinted');
    PR.prettyPrint();
  }

  function handleSnippetChange() {
    var selectedIndex = snippetsSelect.selectedIndex;
    localStorage.setItem(selectedIndexStorageKey, selectedIndex);
    fillSnippetPre(selectedIndex);
  }


  // handle DOM elements
  snippetPre.textContent = snippets['Optional semicolon'];
  executeBtn.addEventListener('click', executeSnippet);
  populateSnippetsSelect();
  var selectedIndex = localStorage.getItem(selectedIndexStorageKey) || 0;
  snippetsSelect.selectedIndex = selectedIndex;
  fillSnippetPre(selectedIndex);
  snippetsSelect.addEventListener('change', handleSnippetChange);
})();