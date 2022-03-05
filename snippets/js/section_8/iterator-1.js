function createIterator(items) {
  let i = 0;
  return {
    next: function () {
      const done = (i >= items.length);
      const value = done ? undefined : items[i++];
      return {
        done,
        value,
      };
    }
  };
}

const iterator = createIterator(['Bamboo', 'constitutes about 95% of', `the red panda's diet`]);
console.log(iterator.next()); // {done: false, value: "Bamboo"}
console.log(iterator.next()); // {done: false, value: "constitutes about 95% of"}
console.log(iterator.next()); // {done: false, value: "the red panda's diet"}

console.log(iterator.next()); // {done: true, value: undefined}
console.log(iterator.next()); // {done: true, value: undefined}
console.log(iterator.next()); // {done: true, value: undefined}
