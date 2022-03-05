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
}

console.log('Object.keys(user1): ', Object.keys(user1));

const user2 = {
  age: 12
};

Object.assign(user2, user1);
console.log('user2: ', user2);

const user3 = {
  country: 'NL'
};

// spread operator
const user4 = { ...user3, ...user1 };
console.log('user4: ', user4);
