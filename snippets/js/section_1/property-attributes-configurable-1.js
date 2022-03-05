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
console.log('user.age 2:', user.age);
