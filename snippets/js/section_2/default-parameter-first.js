function sayHello(name = 'world', lastname) {
  console.log(`Hello, ${name} ${lastname}!`);
}
sayHello();
sayHello('John');
sayHello('John', 'Smith');