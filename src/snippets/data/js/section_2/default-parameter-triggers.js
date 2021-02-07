function sayHello(name = 'world') {
  console.log(`Hello, ${name}!`);
}
sayHello();
sayHello(undefined);
sayHello(null);
sayHello(0);
sayHello({});
sayHello([]);