const user = {};
Object.defineProperty(user, 'surname', {
  value: 'Jones',
  writable: false
});

console.log('user.surname before change:', user.surname);
user.surname = 'Smith';
console.log('user.surname after change:', user.surname);
