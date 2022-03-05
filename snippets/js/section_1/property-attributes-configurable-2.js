const user = {};
Object.defineProperty(user, 'name', {
  value: 'A',
  writable: true,
  configurable: false
});
user.name = 'B';
console.log(user.name);
Object.defineProperty(user, 'name', {
  value: 'C',
  writable: false,
});
user.name = 'D';
console.log(user.name);

Object.defineProperty(user, 'name', {
  writable: true,
});
