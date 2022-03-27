# Prototype-based inheritance

## The prototype chain

> Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with `null` as its prototype. By definition, `null` has no prototype, and acts as the final link in this prototype chain.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

In the section about [objects](./objects), we saw examples of objects created in the following way:
```javascript
const user = {
  name: 'John',
  surname: 'Smith',
};
```

This kind of syntax is called a literal notation.

> All objects created by object literals have the same prototype object, and we can refer to this prototype object in JavaScript code as `Object.prototype`.

Source: [David Flanagan's 'JavaScript: The Definitive Guide'](https://www.amazon.com/JavaScript-Definitive-Most-Used-Programming-Language/dp/1491952024/ref=sr_1_1?crid=27DYQEI5YUD4T&dchild=1&keywords=javascript+the+definitive+guide&qid=1592932638&sprefix=javascript+the+defini%2Caps%2C107&sr=8-1), p. 201

### Accessing object's prototype

> The `__proto__` property of `Object.prototype` is an accessor property (a getter function and a setter function) that exposes the internal `[[Prototype]]` (either an object or `null`) of the object through which it is accessed.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)

Example:
```javascript
const o = {
  a: 5,
};
o.__proto__ === Object.prototype; // true
```

> Warning: Changing the `[[Prototype]]` of an object is, by the nature of how modern JavaScript engines optimize property accesses, a very slow operation, in every browser and JavaScript engine. (...) If you care about performance you should avoid setting the `[[Prototype]]` of an object. Instead, create a new object with the desired `[[Prototype]]` using `Object.create()`.

> Warning: While `Object.prototype.__proto__` is supported today in most browsers, its existence and exact behavior has only been standardized in the ECMAScript 2015 specification as a legacy feature to ensure compatibility for web browsers. For better support, use `Object.getPrototypeOf()` instead.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)

Example:
```javascript
const o = {
  a: 5,
};
Object.getPrototypeOf(o) === Object.prototype; // true
```

### Own properties
Properties defined directly on an object, like `a` in the examples above, are called the object's *own* properties. Apart from them, we also have access to properties that the object inherited from its prototype, for example the `toString` method:
```javascript
const o = {
  a: 5,
};
o.toString(); // "[object Object]"
```

> An object's prototype object may also have a prototype object, which it inherits methods and properties from, and so on. This is often referred to as a prototype chain, and explains why different objects have properties and methods defined on other objects available to them.

[Source](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)

We can check if a given property is an own property of an object or not by using a built-in `hasOwnProperty` method:
```javascript
const f = () => {};
console.log(f.__proto__); // ƒ () { [native code] }
console.log(f.hasOwnProperty('__proto__')); // false
console.log(Object.prototype.hasOwnProperty('__proto__')); // true
```
We can also get more details about object's own properties by calling `Object.getOwnPropertyDescriptor`:
```javascript
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__')); // {enumerable: false, configurable: true, get: ƒ, set: ƒ}
```

## Constructor functions
In [The prototype chain](#the-prototype-chain) section, we saw examples of objects created with the object literal syntax. Another way of creating objects in JavaScript involves using a constructor function.

> A constructor is a function designed for the initialization of newly created objects. Constructors are invoked using the `new` keyword (...). The critical feature of constructor invocations is that the `prototype` property of the constructor is used as the prototype of the new object. This means that all objects created with the same constructor inherit from the same object and are therefore members of the same class.

Source: [David Flanagan's 'JavaScript: The Definitive Guide'](https://www.amazon.com/JavaScript-Definitive-Most-Used-Programming-Language/dp/1491952024/ref=sr_1_1?crid=27DYQEI5YUD4T&dchild=1&keywords=javascript+the+definitive+guide&qid=1592932638&sprefix=javascript+the+defini%2Caps%2C107&sr=8-1), p. 201

> The `new` keyword does the following things:
>
> 1. Creates a blank, plain JavaScript object.
> 2. Adds a property to the new object (`__proto__`) that links to the constructor function's prototype object
>
> ---
> Note: Properties/objects added to the construction function prototype are therefore accessible to all instances created from the constructor function (using `new`).
>
> 3. Binds the newly created object instance as the `this` context (i.e. all references to `this` in the constructor function now refer to the object created in the first step).
> 4. Returns `this` if the function doesn't return an object.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)

Example:
```javascript
function Panda(name, sex, yearOfBirth) {
  this.name = name;
  this.sex = sex;
  this.yearOfBirth = yearOfBirth;
}

Panda.prototype.favouriteFood = 'bamboo';

const panda = new Panda('Wanda', 'female', 2015);

console.log('Panda Wanda:', panda); // Panda Wanda: Panda {name: 'Wanda', sex: 'female', yearOfBirth: 2015}
console.log('Favourite food of panda Wanda (1):', panda.favouriteFood); // Favourite food of panda Wanda (1): bamboo
```
---
### Note: arrow functions
Arrow functions cannot be used as constructor functions and, therefore, cannot be called with the `new` operator:
```javascript
const Panda = (name, sex, yearOfBirth) => {
  this.name = name;
  this.sex = sex;
  this.yearOfBirth = yearOfBirth;
}

const panda = new Panda('Wanda', 'female', 2015); // Uncaught TypeError: Panda is not a constructor
```
---

Note that if `panda` has its own `favouriteFood` property, then its value is returned instead of the value of `favouriteFood` from `Panda.prototype`. This is called *property shadowing*:

```javascript
panda.favouriteFood = 'pizza';
console.log('Favourite food of panda Wanda (2):', panda.favouriteFood); // Favourite food of panda Wanda (2): pizza

delete panda.favouriteFood;
console.log('Favourite food of panda Wanda (3):', panda.favouriteFood); // Favourite food of panda Wanda (3): bamboo
```
Another interesting fact is that if we add a property to `Panda.prototype` after `panda` has been created, this property will be available on `panda` (and any other existing or future instances of `Panda` as well):
```javascript
console.log('Favourite movie of panda Wanda (1):', panda.favouriteMovie); // Favourite movie of panda Wanda (1): undefined

Panda.prototype.favouriteMovie = 'Kung Fu Panda';
console.log('Favourite movie of panda Wanda (2):', panda.favouriteMovie); // Favourite movie of panda Wanda (2): Kung Fu Panda
```

The `prototype` object can also contain methods that will be available on the constructor's instances. The `this` keyword inside of these methods bodies will refer to objects they are called on, e.g.:
```javascript
function Panda(name, sex, yearOfBirth) {
  this.name = name;
  this.sex = sex;
  this.yearOfBirth = yearOfBirth;
}

Panda.prototype.sayHello = function() {
  console.log('Hello, my name is ' + this.name + '!');
};

const panda = new Panda('Wanda', 'female', 2015);

panda.sayHello(); // Hello, my name is Wanda!
```
A similar effect can be achieved by defining the `sayHello` method directly on the object inside the constructor function:
```javascript
function Panda(name, sex, yearOfBirth) {
  this.name = name;
  this.sex = sex;
  this.yearOfBirth = yearOfBirth;
  this.sayHello = function() {
    console.log('Hello, my name is ' + this.name + '!');
  };
}

const panda = new Panda('Wanda', 'female', 2015);

panda.sayHello(); // Hello, my name is Wanda!
```

The difference is that in the first case all instances share the same copy of the `sayHello` function. In the second case, each instance gets its own copy of the function:

```javascript
function Panda(name, sex, yearOfBirth) {
  this.name = name;
  this.sex = sex;
  this.yearOfBirth = yearOfBirth;
  this.methodFromConstructor = function() {};
}

Panda.prototype.methodFromPrototype = function() {};

const panda1 = new Panda('Wanda', 'female', 2015);
const panda2 = new Panda('Miranda', 'female', 2018);

console.log(panda1.methodFromConstructor === panda2.methodFromConstructor); // false
console.log(panda1.methodFromPrototype === panda2.methodFromPrototype); // true
```

---
### Note: extending vs overriding constructor's `prototype` property
Add properties to constructor's `prototype` property instead of overriding the whole property value. Otherwise you will lose some of `prototype`'s properties:
```javascript
function Panda(name, sex, yearOfBirth) {
  this.name = name;
  this.sex = sex;
  this.yearOfBirth = yearOfBirth;
}

Panda.prototype.favouriteFood = 'bamboo';
Panda.prototype.constructor;
// ƒ Panda(name, sex, yearOfBirth) {
//   this.name = name;
//   this.sex = sex;
//   this.yearOfBirth = yearOfBirth;
// }
```

```javascript
function Panda(name, sex, yearOfBirth) {
  this.name = name;
  this.sex = sex;
  this.yearOfBirth = yearOfBirth;
}

Panda.prototype = { favouriteFood: 'bamboo' };
Panda.prototype.constructor;
// ƒ Object() { [native code] }
```

---
### Note: Naming convention
> (...) constructor functions define, in a sense, classes, and classes have names that begin with capital letters. Regular functions and methods have names that begin with lowercase letters.

Source: [David Flanagan's 'JavaScript: The Definitive Guide'](https://www.amazon.com/JavaScript-Definitive-Most-Used-Programming-Language/dp/1491952024/ref=sr_1_1?crid=27DYQEI5YUD4T&dchild=1&keywords=javascript+the+definitive+guide&qid=1592932638&sprefix=javascript+the+defini%2Caps%2C107&sr=8-1), p. 202

---
### Note: returning a value from a constructor function
As mentioned before, if a constructor function doesn't return an object explicitly (i.e. with a `return` statement), then by default it returns the newly created object that `this` refers to. This means that if the constructor's body contains a `return` statement followed by a primitive value, this value will be ignored and `this` will be returned instead when the constructor is called with `new`:
```javascript
function Panda(name, sex, yearOfBirth) {
  this.name = name;
  this.sex = sex;
  this.yearOfBirth = yearOfBirth;
  return 5;
}

Panda.prototype.favouriteFood = 'bamboo';

const panda = new Panda('Wanda', 'female', 2015);
console.log(panda); // 5, as a primitive value, is ignored and a Panda instance is returned instead
console.log(panda.favouriteFood); // bamboo
```

```javascript
function Panda(name, sex, yearOfBirth) {
  this.name = name;
  this.sex = sex;
  this.yearOfBirth = yearOfBirth;
  return { x: 1, y: 2 };
}

Panda.prototype.favouriteFood = 'bamboo';

const panda = new Panda('Wanda', 'female', 2015);
console.log(panda); // { x: 1, y: 2 } is an object, so it is returned instead of `this`. The returned object's `__proto__` property is not set to the constructor function's prototype object, so `panda.favouriteFood` is `undefined`:
console.log(panda.favouriteFood); // undefined
```
---
### Note: calling a constructor function as a regular function

> While the constructor function can be invoked like any regular function (i.e. without the `new` operator), in this case a new Object is not created and the value of `this` is also different.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)

Example:
```javascript
function Panda(name, sex, yearOfBirth) {
  this.name = name;
  this.sex = sex;
  this.yearOfBirth = yearOfBirth;
  console.log('this:', this); // this: Window {0: Window, window: Window, self: Window, document: document, name: 'Wanda', location: Location, …}, when run in the browser
}

Panda.prototype.favouriteFood = 'bamboo';

const panda = Panda('Wanda', 'female', 2015); // undefined
console.log(window.name); // "Wanda", when run in the browser
```
---
### Note: extending native prototypes

> In JavaScript, you can extend any object, including builtin or "native" objects. Sometimes people change the behavior of these native objects in ways that break the assumptions made about them in other parts of the code.
>
> For example here we are overriding a builtin method that will then affect all Objects, even other builtins.
>
> ```javascript
> // seems harmless
> Object.prototype.extra = 55;
>
> // loop through some userIds
> var users = {
>     "123": "Stan",
>     "456": "David"
> };
>
> // not what you'd expect
> for (var id in users) {
>     console.log(id); // "123", "456", "extra"
> }
> ```

[Source](https://eslint.org/docs/rules/no-extend-native)

## The `instanceof` operator
> The `instanceof` operator tests to see if the prototype property of a constructor appears anywhere in the prototype chain of an object. The return value is a boolean value.

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)

Example 1:
```javascript
function Panda(name, sex, yearOfBirth) {
  this.name = name;
  this.sex = sex;
  this.yearOfBirth = yearOfBirth;
}

const panda = new Panda('Wanda', 'female', 2015);

console.log(panda instanceof Panda); // true
console.log(panda instanceof Object); // true
```

Example 2:
```javascript
const numbers = [1, 2, 3, 4, 5 ];
console.log(numbers instanceof Array); // true
console.log(numbers instanceof Object); // true
```

Example 3:
```javascript
const f = () => {};
console.log(f.__proto__ === Function.prototype); // true
console.log(f instanceof Function); // true
console.log(f.map); // undefined
f.__proto__ = Array.prototype;
console.log(f.__proto__ === Array.prototype); // true
console.log(f instanceof Array); // true
console.log(f.map); // ƒ map() { [native code] }
```
---
### Note
As mentioned in the ['Accessing object's prototype'](#accessing-objects-prototype) section, changing the `[[Prototype]]` of an object is a bad practice that can affect code's performance. It is done in the example above only to demostrate the behaviour of the `instanceof` operator.

## Inheritance between child and parent constructor functions

Prior to ECMAScript 6, there was no specific keyword to extend one, "parent" constructor in order to create a child constructor. Instead, this goal could be achieved by explicitly calling the parent constructor in the child one and setting child's prototype to a copy of parent's prototype.

Here's an example:
```javascript
function Animal(name, sex, yearOfBirth) {
  this.name = name;
  this.sex = sex;
  this.yearOfBirth = yearOfBirth;
}

Animal.prototype.eat = function () {
  return 'Om nom nom nom...';
};

function GiantPanda(name, sex, yearOfBirth, favouriteSportDiscipline) {
  Animal.call(this, name, sex, yearOfBirth);
  this.favouriteSportDiscipline = favouriteSportDiscipline;
}
GiantPanda.prototype = Object.create(Animal.prototype);
Object.defineProperty(GiantPanda.prototype, 'constructor', {
  value: GiantPanda,
  enumerable: false,
  writable: true,
});

function Llama(name, sex, yearOfBirth, spittingDistance) {
  Animal.call(this, name, sex, yearOfBirth);
  this.spittingDistance = spittingDistance;
}
Llama.prototype = Object.create(Animal.prototype);
Object.defineProperty(Llama.prototype, 'constructor', {
  value: Llama,
  enumerable: false,
  writable: true,
});
Llama.prototype.spit = function () {
  return 'Ptui!';
};


const panda = new GiantPanda('Wanda', 'female', 2015, 'climbing');
console.log('panda: ', panda);
console.log('panda.eat(): ', panda.eat());

const llama = new Llama('Daisy', 'female', 2015, 450);
console.log('llama: ', llama);
console.log('llama.eat(): ', llama.eat());
console.log('llama.spit(): ', llama.spit());
```

Note that in the line:
```javascript
GiantPanda.prototype = Object.create(Animal.prototype);
```
we don't set `GiantPanda`'s prototype to `Animal.prototype`, but to an object that has its prototype set to `Animal.prototype`:
```javascript
GiantPanda.prototype === Animal.prototype; // false
GiantPanda.prototype.__proto__ === Animal.prototype; // true
```
Thanks to that, we can add methods and properties to `GiantPanda.prototype` without adding them to `Animal.prototype`.

 You can read more about prototypal inheritance [here](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance).

In ES6, a new `class` keyword has been introduced, along with `extends`, which simplifies implementation of inheritance between classes. You can find more about ES6 classes in the [Classes](./classes.md) section.
