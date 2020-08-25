# Objects:
- unordered collections of properties
- there are two kinds of properties:
  - [**data** properties](#data-properties)
  - [**accessor** properties](#accessor-properties) 
- each property has a name and a set of [attributes](#property-attributes)
- a name can be of type:
  - String
  - Symbol
- until symbols existed, object keys could only be strings (a non-string value used as a key for an object will be coerced to a string)
```javascript
var o = {};
o.a = 1;
o['b'] = 2;
o[2] = 3;
o[{}] = 4;
console.log(JSON.stringify(o)); // {"2":3,"a":1,"b":2,"[object Object]":4} 
```
**Tricky job interview question**

What is the output of the following code?
```javascript
var dwayne = {}, daniel = { firstName: 'Daniel'}, jason = {key: 'jason'};

dwayne[daniel] = 123;
dwayne[jason] = 456;

console.log(dwayne[daniel]);
```
Source: https://codeburst.io/javascript-interview-questions-objects-171c1d86512d
## Data properties
- properties that have a simple value
- a value can be:
  - a primitive value
  - an object
- example:
```javascript
let user = {
  name: 'John',
  surname: 'Smith',
};

console.log(user.name); // John
console.log(user.surname); // Smith

user.name = 'Peter';
console.log(user.name); // Peter
```
## Accessor properties
- In
ECMAScript 5 property's value may be replaced by one or two methods, known as a **getter** (defined with the `get` keyword) and a **setter** (defined with the `set` keyword)
- Properties defined by getters and setters = **accessor** properties
-  If a property
has both a getter and a setter method, it is a read/write property. Example:
```javascript
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};

// set fullName is executed with the given value.
user.fullName = "Alice Cooper";

console.log(user.name); // Alice
console.log(user.surname); // Cooper
console.log(user.fullName); // Alice Cooper
```
Source: https://javascript.info/property-accessors
- If a property has only a getter
method, it is a read-only property. Example:
```javascript
'use strict';
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },
};

// set fullName is executed with the given value.
user.fullName = "Alice Cooper"; // Error (only in strict mode): 
// Uncaught TypeError: Cannot set property fullName of #<Object> which has only a getter

console.log(user.name); // John
console.log(user.surname); // Smith
console.log(user.fullName); // John Smith
```
- If a property has only a setter method, it is a write-only property and attempts to read it always evaluate to `undefined`. Example:
```javascript
'use strict';
let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};

// set fullName is executed with the given value.
user.fullName = "Alice Cooper";

console.log(user.name); // Alice
console.log(user.surname); // Cooper
console.log(user.fullName); // undefined. No error, even in strict mode
```
Source: https://javascript.info/property-accessors
## Property attributes
- in addition to its name, each property has a set of attributes
- these attributes can be defined for new properties or modified for existing ones with the `Object.defineProperty` method
- data properties attributes:
  - `value`
  - `writable`
    - `true` if and only if the value associated with the property may be changed with an assignment operator (`=`).
    - examples (notice the error in strict mode):
```javascript
// in non-strict mode
var user = {};
Object.defineProperty(user, 'surname', {
  value: 'Jones',
  writable: false
});

console.log('user.surname before change:', user.surname) // user.surname before change: Jones
user.name = 'Smith'; 
console.log('user.surname after change:',user.surname);  // user.surname after change: Jones
```
```javascript
//  in strict mode
'use strict';
var user = {};
Object.defineProperty(user, 'surname', {
  value: 'Jones',
  writable: false
});

user.surname = 'Smith'; // VM350:9 Uncaught TypeError: Cannot assign to read only property 'surname' of object '#<Object>'
```
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty (slightly modified)
- accessor properties attributes:
  - `get`
  - `set`
- all properties atttributes:
  - `enumerable`
    - defines whether the property is picked by `Object.assign` or spread operator (`...`)
    - for non-Symbols properties it also defines whether it shows up in a `for...in` loop and `Object.keys` or not (Symbol properties are never enumerable in `for...in` iterations and `Object.keys` method)
    - example:
```javascript
const user1 = {};
Object.defineProperty(user1, 'name', {
  value: 'John',
  enumerable: true
});
Object.defineProperty(user1, 'surname', {
  value: 'Smith',
  enumerable: false
  });

for (const property in user1) {
  console.log(`${property}: ${user1[property]}`);
} // name: John

console.log('Object.keys(user1): ', Object.keys(user1)); // Object.keys(user1): ["name"]

const user2 = {
  age: 12
};

Object.assign(user2, user1);
console.log('user2: ', user2); // user2: {age: 12, name: "John"}

const user3 = {
  country: 'NL'
};

// spread operator
const user4 = { ...user3, ...user1 };
console.log('user4: ', user4); // user4:  {country: "NL", name: "John"}
```
  - `configurable` - controls:
    - whether the property can be deleted from the object
    - whether the property's attributes (other than `value` and `writable`) can be changed
    - examples:
```javascript
const user = {};
Object.defineProperty(user, 'age', {
  get() { return 50; },
  configurable: false
});
try {
  Object.defineProperty(user, 'age', {
    configurable: true
  });
} catch (error) {
  console.error('error 1:', error); // error 1:  TypeError: Cannot redefine property: age  at Function.defineProperty
}
try {
  Object.defineProperty(user, 'age', {
    enumerable: true
  });
} catch (error) {
  console.error('error 2:', error); // error 2:  TypeError: Cannot redefine property: age at Function.defineProperty 
}
try {
  Object.defineProperty(user, 'age', {
    set() { }
  });
} catch (error) {
  console.error('error 3:', error); // error 3:  TypeError: Cannot redefine property: age at Function.defineProperty
}
try {
  Object.defineProperty(user, 'age', {
    get() { return 50; }
  });
} catch (error) {
  console.error('error 4:', error); // error 4: TypeError: Cannot redefine property: age at Function.defineProperty
}
try {
  Object.defineProperty(user, 'age', {
    value: 12
  });
} catch (error) {
  console.error('error 5:', error); // error 5: TypeError: Cannot redefine property: age at Function.defineProperty
}

console.log('user.age 1:', user.age);
delete user.age;
console.log('user.age 2:', user.age);
```
```javascript
//@TODO data-property example
```
@TODO: default property attributes values (for properties defined with `defineProperty` and directly)

Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty (slightly modified)

Sources: 
- https://medium.com/intrinsic/javascript-symbols-but-why-6b02768f4a5c
- JavaScript: The Definitive Guide. Chapter 6: Objects
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty 