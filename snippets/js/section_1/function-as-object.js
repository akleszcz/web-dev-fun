function sayHello() {
  console.log('hello');
}
sayHello();
console.log('sayHello.name:', sayHello.name);
sayHello.newProperty = 'newValue';
console.log('sayHello.newProperty: ', sayHello.newProperty);