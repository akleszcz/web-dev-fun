# Classes

The `class` keyword has been introduced in ES6 version of JavaScript. In earlier versions, a class-like behavior was achieved by using constructor functions, that you can read more about [here](./prototype_based_inheritance.md).

## Simple class declaration

A simple class declaration looks like this:

```javascript
class Panda {
  constructor(name, sex, yearOfBirth) {
    this.name = name;
    this.sex = sex;
    this.yearOfBirth = yearOfBirth;
  }
}
```

Compare it to the constructor function we analysed in the [Prototype-based inheritance](./prototype_based_inheritance.md) section:

```javascript
function Panda(name, sex, yearOfBirth) {
  this.name = name;
  this.sex = sex;
  this.yearOfBirth = yearOfBirth;
}
```

## Methods

Class methods can be defined with the following syntax:

```javascript
class Panda {
  constructor(name, sex, yearOfBirth) {
    this.name = name;
    this.sex = sex;
    this.yearOfBirth = yearOfBirth;
  }

  sayHello() {
    console.log("Hello, my name is " + this.name + "!");
  }
}
```

which is the equivalent of

```javascript
Panda.prototype.sayHello = function () {
  console.log("Hello, my name is " + this.name + "!");
};
```

syntax that we used for constructor functions, with one difference: methods defined with the `class` syntax are non-enumerable:

```javascript
class Panda {
  constructor(name, sex, yearOfBirth) {
    this.name = name;
    this.sex = sex;
    this.yearOfBirth = yearOfBirth;
  }

  sayHello() {
    console.log("Hello, my name is " + this.name + "!");
  }
}

console.log(Panda.prototype.sayHello);
// Result in the browser:
// ƒ sayHello() {
//   console.log('Hello, my name is ' + this.name + '!');
// }

console.log(Object.getOwnPropertyDescriptor(Panda.prototype, 'sayHello'));
// { writable: true, enumerable: false, configurable: true, value: ƒ }
```
while methods added manually to a constructor function's prototype are enumerable:
```javascript
function Panda(name, sex, yearOfBirth) {
  this.name = name;
  this.sex = sex;
  this.yearOfBirth = yearOfBirth;
}

Panda.prototype.sayHello = function () {
  console.log("Hello, my name is " + this.name + "!");
};

console.log(Object.getOwnPropertyDescriptor(Panda.prototype, 'sayHello'));
// { writable: true, enumerable: true, configurable: true, value: ƒ }
```

Generally speaking, class declarations are just syntactic sugar on top of the
constructor function syntax. For example, the `Panda` class declaration above is equivalent to the following code:

```javascript
let Panda = (function () {
  "use strict";
  const Panda = function (name) {
    if (typeof new.target === "undefined") {
      throw new Error(
        "Class constructor Panda cannot be invoked without 'new'"
      );
    }
    this.name = name;
  };
  Object.defineProperty(Panda.prototype, "sayHello", {
    value: function () {
      if (typeof new.target !== "undefined") {
        throw new Error("Method cannot be called with new.");
      }
      console.log("Hello, my name is " + this.name + "!");
    },
    enumerable: false,
    writable: true,
    configurable: true,
  });
  return Panda;
})();
```

Sorce: this is a slightly modified example of the `PersonClass` example from _Understanding ECMAScript 6: The Definitive Guide for JavaScript Developers_, Nicholas C. Zakas, p. 169

This implies some differences between classes and constructor functions that we are going to explore in the next section.

## Differences between classes and constructor functions

### Hoisting

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes):

> An important difference between function declarations and class declarations is that function declarations are hoisted and class declarations are not. You first need to declare your class and then access it, otherwise code like the following will throw a `ReferenceError`.

Example:

```javascript
try {
  const panda1 = new Panda1("Wanda", "female", 2015);
  console.log("panda1: ", panda1); // panda1: Panda1 {name: 'Wanda', sex: 'female', yearOfBirth: 2015}
  const panda2 = new Panda2("Miranda", "female", 2018);
  console.log("panda2 :", panda2);
} catch (error) {
  console.error("Error: ", error); // Error:  ReferenceError: Panda2 is not defined
}

function Panda1(name, sex, yearOfBirth) {
  this.name = name;
  this.sex = sex;
  this.yearOfBirth = yearOfBirth;
}

class Panda2 {
  constructor(name, sex, yearOfBirth) {
    this.name = name;
    this.sex = sex;
    this.yearOfBirth = yearOfBirth;
  }
}
```

In fact, class declarations are hoisted, but remain uninitialised until the class statement is evaluated. Before that evaluation, they are in the [temporal dead zone](..\section_1_js_fundamentals\notes\js_variable_declaration.md#temporal-dead-zone-tdz):
```javascript
class Panda { static description = 'Outer Panda class' }
console.log('Panda from outer scope:', Panda); // Panda from outer scope: class Panda { static description = 'Outer Panda class' }

{
  console.log('Panda from inner scope:', Panda); // Uncaught ReferenceError: Cannot access 'Panda' before initialization
  class Panda { static description = 'Inner Panda class' }
}
```

### Strict mode

The code inside of a class's body is executed in strict mode. One of the differences between strict and non-strict mode that we've learned so far is that only in non-strict mode we are allowed to:

- assign a value to an undeclared variable:

  ```javascript
  // 'use strict';
  x = 5; // 'Uncaught ReferenceError: x is not defined' in strict mode.
  console.log(x); // 5 in non-strict mode
  ```

- use octal integers:

  ```javascript
  // 'use strict';
  let x = 03; // 'Uncaught SyntaxError: Octal literals are not allowed' in strict mode.
  ```

  Example:

  ```javascript
  function RedPanda() {
    x = 5;
  }

  class GiantPanda {
    constructor() {
      y = 5;
    }
  }

  const panda1 = new RedPanda(); // OK
  const panda2 = new GiantPanda(); // Uncaught ReferenceError: y is not defined
  ```

### Invocation without `new`

Trying to use a class as a regular function, that is to call it without the `new` keyword, will result in an error:

```javascript
function RedPanda() {}

class GiantPanda {}

const panda1 = RedPanda();
const panda2 = GiantPanda(); // Uncaught TypeError: Class constructor GiantPanda cannot be invoked without 'new'
```

## The `constructor` method

> The `constructor` method is a special method for creating and initializing an object created with a class.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#constructor)

We've already seen a `constructor` method defined in one of the earlier examples:

```javascript
class Panda2 {
  constructor(name, sex, yearOfBirth) {
    this.name = name;
    this.sex = sex;
    this.yearOfBirth = yearOfBirth;
  }
}
```

The `constructor` method will be called with values that we provide when instantiating a new `Panda` object:

```javascript
class Panda {
  constructor(name, sex, yearOfBirth) {
    console.log(
      "Panda constructor has been called with :",
      name,
      sex,
      yearOfBirth
    );
    this.name = name;
    this.sex = sex;
    this.yearOfBirth = yearOfBirth;
  }
}

const panda = new Panda("Wanda", "female", 2015); // Panda constructor has been called with : Wanda female 2015
```

> There can only be one special method with the name "constructor" in a class. A `SyntaxError` will be thrown if the class contains more than one occurrence of a `constructor` method.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#constructor)

Example:

```javascript
class Panda {
  constructor(name, sex, yearOfBirth) {
    this.name = name;
    this.sex = sex;
    this.yearOfBirth = yearOfBirth;
  }

  constructor() {} // Uncaught SyntaxError: A class may only have one constructor
}
```

If we don't define the constructor explicitly, a default one will be used. For classes that don't extend other classes (like in the example above), the default constructor looks like this:

```javascript
constructor() {}
```

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor#description)

For a _derived_ class, i.e. a class that extends another class, the default constructor looks slightly different. More on this in the [Inheritance](#inheritance) section.

## Defining insances own properties

When the class syntax was first introduced in ES6, own properties, i.e. properties that exist on class instance rather than its prototype, could only be created inside a class constructor or method:

```javascript
class Panda {
  constructor(sex, yearOfBirth) {
    this.sex = sex;
    this.yearOfBirth = yearOfBirth;
  }

  giveAName(name) {
    this.name = name;
  }
}

const panda = new Panda("female", 2015);
console.log(panda);
panda.giveAName("Wanda");
console.log(panda);
```

It was considered a good practice to create all of them in the constructor, to have a single place responsible for them.

## Field declaration syntax

### Public instance fields

In newer versions of JavaScript, class syntax has been simplified even more. Instance properties no longer need to be defined inside of a method. They can now be declared and initialiized at the top level of a class body like this:

```javascript
class Panda {
  name = "Anonymous";

  constructor(sex, yearOfBirth) {
    this.sex = sex;
    this.yearOfBirth = yearOfBirth;
  }
}

const panda = new Panda("female", 2015);
console.log(panda); // {name: 'Anonymous', sex: 'female', yearOfBirth: 2015}
```

Fields without an initializing value assigned will be initialized with `undefined`:

```javascript
class Panda {
  name;

  constructor(sex, yearOfBirth) {
    this.sex = sex;
    this.yearOfBirth = yearOfBirth;
  }
}

const panda = new Panda("female", 2015);
console.log(panda); // {name: undefined, sex: 'female', yearOfBirth: 2015}
```

The initializing value can be overriden in the `constructor`:

```javascript
class Panda {
  name = "Anonymous";

  constructor(name, sex, yearOfBirth) {
    this.name = name;
    this.sex = sex;
    this.yearOfBirth = yearOfBirth;
  }
}

const panda = new Panda("Wanda", "female", 2015);
console.log(panda); // {name: 'Wanda', sex: 'female', yearOfBirth: 2015}
```

Note that a value of `undefined` passed to the constructor will override the initializing value as well:

```javascript
class Panda {
  name = "Anonymous";

  constructor(name, sex, yearOfBirth) {
    this.name = name;
    this.sex = sex;
    this.yearOfBirth = yearOfBirth;
  }
}

const panda = new Panda(undefined, "female", 2015); // {name: undefined, sex: 'female', yearOfBirth: 2015}
console.log(panda);
```

Another example:

```javascript
class Rectangle {
  height = 0;
  width;
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#field_declarations)

```javascript
const r = new Rectangle();
console.log(r); // {height: undefined, width: undefined}
```

Therefore the initializing value doesn't act as the default value used when no other value is passed to the constructor. Why use the field declaration syntax then? One reason may be that:

> By declaring fields up-front, class definitions become more self-documenting, and the fields are always present.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#field_declarations)

---

### A note on terminology: _field_ vs _property_

> A public field is an instance property, just one created with a field definition rather than by assignment. Other than how they're created, they're exactly the same thing.
>
> The term "field" was used so it could cover both public and private (since private fields are not properties).

[Source](https://stackoverflow.com/questions/54851200/what-is-the-difference-between-class-fields-and-properties-in-javascript)

### Private instance fields
> Class fields are public by default, but private class members can be created by using a hash `#` prefix. The privacy encapsulation of these class features is enforced by JavaScript itself.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)

Example:
```javascript
class Panda {
  #name;

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  setName(value) {
    this.#name = value;
  }
}

const panda = new Panda('Wanda');
console.log(panda.getName()); // Wanda
panda.setName('Miranda');
console.log(panda.getName()); // Miranda
//console.log(panda.#name); // Uncaught SyntaxError: Private field '#name' must be declared in an enclosing class
```
Based on [The Complete Guide to JavaScript Classes](https://dmitripavlutin.com/javascript-classes-complete-guide/#32-private-instance-fields).

>Note that ESnext provides private fields only as declared up-front in a field declaration; private fields cannot be created later, ad-hoc, through assigning to them, the way that normal properties can.

[Source](https://github.com/tc39/proposal-class-fields#private-fields)

Example:
```javascript
class Panda {
  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  setName(value) {
    this.#name = value;
  }
}

// Uncaught SyntaxError: Private field '#name' must be declared in an enclosing class
```
---

## Inheritance
Before the `class` syntax was introduced in ES6, implementing the logic of extending a "class" (i.e. a constructor function) required quite a lot code. You can read more on this topic [here](./prototype_based_inheritance.md#inheritance-between-child-and-parent-constructor-functions).

With the `class` syntax, a new keyword `extends` was provided to simplify this task.

### Syntax
```javascript
class ChildClass extends ParentClass { ... }
```
[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends)

Example:
```javascript
class Animal {
  constructor(name, sex, yearOfBirth) {
    this.name = name;
    this.sex = sex;
    this.yearOfBirth = yearOfBirth;
  }

  eat () {
    return 'Om nom nom nom...';
  };
}

class Llama extends Animal {
  constructor(name, sex, yearOfBirth, spittingDistance) {
    super(name, sex, yearOfBirth);
    this.spittingDistance = spittingDistance;
  }

  spit () {
    return 'Ptui!';
  };
}

const llama = new Llama('Daisy', 'female', 2015, 450);
console.log('llama: ', llama);
console.log('llama.eat(): ', llama.eat());
console.log('llama.spit(): ', llama.spit());
```

