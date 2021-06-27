function getIntegersIterator() {
  let value = 0;

  return {
    next: function () {
      const result = { value, done: false }
      value += 1;
      return result;
    }
  };
}

const iterator = getIntegersIterator();
console.log(iterator.next()); // {value: 0, done: false}
console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}