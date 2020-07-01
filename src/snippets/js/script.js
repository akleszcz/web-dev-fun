(function () { // Use IIFE to avoid polluting the global scope.
  // get DOM elements
  var snippetPre = document.getElementById('snippet');
  var executeBtn = document.getElementById('execute-btn');
  var snippetsSelect = document.getElementById('snippets-select');
  // define code snippets
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

    'Logical operators precedence': `console.log(true || false && false);
console.log(true || (false && false));
console.log((true || false) && false);
`
  };

  // define functions
  function executeSnippet() {
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

  function fillSnippetPre() {
    var selectedSnippetTitle = snippetsSelect.options[snippetsSelect.selectedIndex].textContent;
    var selectedSnippet = snippets[selectedSnippetTitle];
    snippetPre.textContent = selectedSnippet;
    snippetPre.classList.remove('prettyprinted');
    PR.prettyPrint();
  }


  // handle DOM elements
  snippetPre.textContent = snippets['Optional semicolon'];
  executeBtn.addEventListener('click', executeSnippet);
  populateSnippetsSelect();
  fillSnippetPre();
  snippetsSelect.addEventListener('change', fillSnippetPre);
})();