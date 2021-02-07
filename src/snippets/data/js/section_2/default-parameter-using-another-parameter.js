function sayHello(name = 'world', lastname = `${name}son`) {
  console.log(`Hello, ${name} ${lastname}!`);
}
sayHello();
sayHello('John');
sayHello('John', 'Smith');