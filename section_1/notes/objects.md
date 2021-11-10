# Objects:
- unordered collections of properties 
- each property has a name and a set of [attributes](#property-attributes)
- a name can be of type:
  - String
  - Symbol
- until symbols existed, object keys could only be strings (a non-string value used as a key for an object will be coerced to a string)
```javascript
const o = {};
o.a = 1;
o['b'] = 2;
o[2] = 3;
o[{}] = 4;
console.log(JSON.stringify(o)); // {"2":3,"a":1,"b":2,"[object Object]":4} 
```
- there are two kinds of properties:
  - [**data** properties](#data-properties)
  - [**accessor** properties](#accessor-properties)

**Tricky job interview question**

What is the output of the following code?
```javascript
const dwayne = {}, daniel = { firstName: 'Daniel'}, jason = {key: 'jason'};

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
const user = {
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
const user = {
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
const user = {
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
const user = {
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
const user = {};
Object.defineProperty(user, 'surname', {
  value: 'Jones',
  writable: false
});

console.log('user.surname before change:', user.surname); // user.surname before change: Jones
user.surname = 'Smith'; 
console.log('user.surname after change:', user.surname);  // user.surname after change: Jones
```
```javascript
//  in strict mode
'use strict';
const user = {};
Object.defineProperty(user, 'surname', {
  value: 'Jones',
  writable: false
});

user.surname = 'Smith'; // Uncaught TypeError: Cannot assign to read only property 'surname' of object '#<Object>'
```
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty (slightly modified)
- accessor properties attributes:
  - `get`
  - `set`
- all properties attributes:
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
    - summary of non-configurable properties:
    > - it is not possible to change any attribute of a non-configurable accessor property
    > - for data properties, it is possible to modify the value if the property is writable, and it is possible to change writable attribute from `true` to `false`
    > - it is not possible to switch between data and accessor property types when the property is non-configurable.

    Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
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
  console.error('error 1:', error); // error 1:  TypeError: Cannot redefine property: age at Function.defineProperty
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
const user = {};
Object.defineProperty(user, 'name', {
  value: 'A',
  writable: true,
  configurable: false
});
user.name = 'B';
console.log(user.name); // B
Object.defineProperty(user, 'name', {
  value: 'C',
  writable: false,
});
user.name = 'D';
console.log(user.name); // C

Object.defineProperty(user, 'name', {
  writable: true,
}); // Uncaught TypeError: Cannot redefine property: name at Function.defineProperty
```
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty (slightly modified)

### Default property attributes values
```javascript
const o = {
  a: 5
};
o.b = 7;
Object.defineProperty(o, 'c', {
  value: 12
});
console.log('o:', o); // o: {a: 5, b: 7, c: 12}
console.log('o.a:', Object.getOwnPropertyDescriptor(o, 'a')); // {value: 5, writable: true, enumerable: true, configurable: true} 
console.log('o.b:', Object.getOwnPropertyDescriptor(o, 'b')); // {value: 7, writable: true, enumerable: true, configurable: true}
console.log('o.c:', Object.getOwnPropertyDescriptor(o, 'c')); // {value: 12, writable: false, enumerable: false, configurable: false}
```
## Preventing objects modifications
-  `Object.isExtensible` method - determines whether an object is extensible, i.e. whether new properties can be added to
the object or not. All user-defined objects are extensible by default:
```javascript
const o = {};
console.log(Object.isExtensible(o)); // true
o.x = 5;
console.log(o.x); // 5
```
Methods that let us "lock down" objects into a known state:
- `Object.preventExtensions`:
   - Makes an object nonextensible (see how an attempt to add a property to a nonextensible object results in error in strict mode):
      ```javascript
      const o = {};
      Object.preventExtensions(o);
      console.log(Object.isExtensible(o)); // false
      o.x = 5;
      console.log(o.x); // undefined
      ```
      ```javascript
      'use strict';
      const o = {};
      Object.preventExtensions(o);
      console.log(Object.isExtensible(o)); // false
      o.x = 5;
      console.log(o.x); // Uncaught TypeError: Cannot add property x, object is not extensible
      ```
  - Only affects the extensibility of the object itself. The object will still inherit any new properties added to its prototype (more on the prototypal inheritance soon).
  - There is no way to make an object extensible once it has been made nonextensible.
- `Object.seal`:
  - Does what `Object.preventExtensions` does, but additionally makes all of the own properties of an object nonconfigurable. Values of present properties can still be changed as long as they are writable.
  - `Object.isSealed` method can be used to determine whether an object is sealed.
  - Example:
    ```javascript
    const o = {
      x: 5
    };

    console.log(Object.isSealed(o)); // false
    Object.seal(o);
    console.log(Object.isSealed(o)); // true

    o.x = 100;
    o.y = 200;

    console.log(o.x); // 100
    console.log(o.y); // undefined

    console.log(delete o.x); // false
    console.log(o.x); // 100
    ```
    ```javascript
    'use strict';  
    const o = {
      x: 5
    };

    Object.seal(o);
    o.x = 100;
    o.y = 200; // Uncaught TypeError: Cannot add property y, object is not extensible
    ```
- `Object.freeze`:
  - Does what `Object.seal` does, but additionally makes all of the own properties of an object read-only. Setter methods of accessor properties will still work. Values that are objects can still be modified, unless they are also frozen.
  - `Object.isFrozen` method can be used to determine whether an object is frozen.
  - Example:
  ```javascript
      const o = {
      x: 5
    };

    console.log(Object.isFrozen(o)); // false
    Object.freeze(o);
    console.log(Object.isFrozen(o)); // true

    o.x = 100;
    o.y = 200;

    console.log(o.x); // 5
    console.log(o.y); // undefined

    console.log(delete o.x); // false
    console.log(o.x); // 5
  ```
  ```javascript
    'use strict';  
    const o = {
      x: 5
    };

    Object.freeze(o);
    o.x = 100; // Uncaught TypeError: Cannot assign to read only property 'x' of object '#<Object>'
  ```
- `Object.preventExtensions`, `Object.seal` and `Object.freeze` all return the same object
that was passed to them.

## Merging objects

- `Object.assign`:
  - > copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object.

  [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

  - Example 1 - one source object:
  ```javascript
  const target = { a: 1, b: 2, c: 3 };
  const source = { x: 10, y: 20, z: 30 };
  const result = Object.assign(target, source);

  console.log('target: ', JSON.stringify(target));
  console.log('source: ', JSON.stringify(source));
  console.log('result: ', JSON.stringify(result));
  console.log(target === result);

  /*
  Result:
  target:  {"a":1,"b":2,"c":3,"x":10,"y":20,"z":30}
  source:  {"x":10,"y":20,"z":30}
  result:  {"a":1,"b":2,"c":3,"x":10,"y":20,"z":30}
  true
  */
  ```

  - Example 2 - multiple source objects - overwriting existing properties:
  ```javascript
  const target = { a: 1, b: 2, c: 3 };
  const source1 = { b: 20, c: 30 };
  const source2 = { c: 300 };
  const result = Object.assign(target, source1, source2);

  console.log('target: ', JSON.stringify(target));
  console.log('source1: ', JSON.stringify(source1));
  console.log('source2: ', JSON.stringify(source2));
  console.log('result: ', JSON.stringify(result));
  console.log(target === result);

  /*
  Result:
  target:  {"a":1,"b":20,"c":300}
  source1:  {"b":20,"c":30}
  source2:  {"c":300}
  result:  {"a":1,"b":20,"c":300}
  true
  */
  ```
  - Example 3 - enumerable & non-enumerable properties:
  ```javascript
  function logOwnProperties(desc, obj) {
    console.log(`${desc}:`, JSON.stringify(Object.getOwnPropertyDescriptors(obj), null, 2));
  }

  const target = { a: 1, b: 2, c: 3 };
  const source = [20, 30];

  logOwnProperties('source', source);

  const result = Object.assign(target, source);

  logOwnProperties('result', result);

  /*
  Result:
  source: {
    "0": {
      "value": 20,
      "writable": true,
      "enumerable": true,
      "configurable": true
    },
    "1": {
      "value": 30,
      "writable": true,
      "enumerable": true,
      "configurable": true
    },
    "length": {
      "value": 2,
      "writable": true,
      "enumerable": false,
      "configurable": false
    }
  }

  result: {
    "0": {
      "value": 20,
      "writable": true,
      "enumerable": true,
      "configurable": true
    },
    "1": {
      "value": 30,
      "writable": true,
      "enumerable": true,
      "configurable": true
    },
    "a": {
      "value": 1,
      "writable": true,
      "enumerable": true,
      "configurable": true
    },
    "b": {
      "value": 2,
      "writable": true,
      "enumerable": true,
      "configurable": true
    },
    "c": {
      "value": 3,
      "writable": true,
      "enumerable": true,
      "configurable": true
    }
  }
  */
  ```

  - Example 4 - own & inherited properties:
  ```javascript
  const target = { a: 1, b: 2, c: 3 };
  const source = [20, 30];

  console.log(typeof source.map); // function
  console.log(Object.hasOwnProperty(source, 'map')); // false

  const result = Object.assign(target, source);

  console.log(typeof result.map); // undefined
  ```

  - > For deep cloning, we need to use alternatives, because `Object.assign()` copies property values.
    >
    > If the source value is a reference to an object, it only copies the reference value.

    [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#deep_clone)

  - Example 5 - properties with objects as values:
  ```javascript
  const source = {
    a: 1,
    b: { x: 10, y: 20 }
  };
  const result = Object.assign({}, source);

  source.a = 2;
  console.log('1: source: ', JSON.stringify(source)); 
  console.log('1: result: ', JSON.stringify(result));

  result.a = 3;
  console.log('2: source: ', JSON.stringify(source)); 
  console.log('3: result: ', JSON.stringify(result));

  console.log('source.b === result.b:', source.b === result.b);

  source.b.x = 11;
  console.log('3: source: ', JSON.stringify(source)); 
  console.log('3: result: ', JSON.stringify(result));

  result.b.x = 12;
  console.log('4: source: ', JSON.stringify(source)); 
  console.log('4: result: ', JSON.stringify(result)); 

  /*
  Result:
  1: source:  {"a":2,"b":{"x":10,"y":20}}
  1: result:  {"a":1,"b":{"x":10,"y":20}}
  2: source:  {"a":2,"b":{"x":10,"y":20}}
  3: result:  {"a":3,"b":{"x":10,"y":20}}
  source.b === result.b: true
  3: source:  {"a":2,"b":{"x":11,"y":20}}
  3: result:  {"a":3,"b":{"x":11,"y":20}}
  4: source:  {"a":2,"b":{"x":12,"y":20}}
  4: result:  {"a":3,"b":{"x":12,"y":20}}
  */
  ```

## Objects creation
There are multiple ways of creating an object in JavaScript, including:
- the _object literal_ syntax that we've seen in the examples above:
  ```javascript
  const user = {
    name: 'John',
    surname: 'Smith',
  };
  ```
- using a [constructor function](../../section_2/prototype_based_inheritance.md#constructor-functions),
- using a method called `Object.create`:
  > The `Object.create()` method creates a new object, using an existing object as the prototype of the newly created object.

  [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

  Example:
  ```javascript
  const Animal = { 
    favouriteFood: 'pizza',
    eat: function () {
      return 'Om nom nom nom...';
    }
  }

  const panda = Object.create(Animal);
  console.log('panda: ', panda);
  panda.favouriteFood = 'bamboo';
  console.log('panda: ', panda);
  ```

You can read more about objects creation [here](
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#creating_new_objects).


@TO READ: http://es5.github.io/#x4.3.7:
Native objects, host objects

Sources: 
- https://medium.com/intrinsic/javascript-symbols-but-why-6b02768f4a5c
- JavaScript: The Definitive Guide. Chapter 6: Objects
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal
- JavaScript: The Definitive Guide. 6.8.3 The extensible Attribute