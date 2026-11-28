const path = require('node:path');

let calculateSubtotal;
try {
  ({ calculateSubtotal } = require(path.join(process.argv[2], 'index.js')));
} catch (error) {
  console.error(`Could not load the package: ${error.message}`);
  process.exit(125);
}

const items = [
  { name: 'Coffee', price: 4, quantity: 2 },
  { name: 'Bagel', price: 3, quantity: 1 },
];
const expected = 11;

let actual;
try {
  actual = calculateSubtotal(items);
} catch (error) {
  console.error(`The behavior check could not run: ${error.message}`);
  process.exit(1);
}

if (actual !== expected) {
  console.error(`Expected subtotal ${expected}, received ${actual}.`);
  console.error('');
  process.exit(1);
}

console.log(`Subtotal is ${actual}, as expected.`);
console.log('');
