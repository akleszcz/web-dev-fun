let value = 5;
function getValue() {
  return value++;
}
function add(first, second = getValue()) {
  return first + second;
}
console.log(add(1, 1));
console.log(add(1));
console.log(add(1));