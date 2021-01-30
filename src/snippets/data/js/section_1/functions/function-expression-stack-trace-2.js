const arr = [1, 2, 3, 4, 5];
const arrDoubled = arr.map(function () { throw new Error('I failed') });
console.log(arrDoubled);
