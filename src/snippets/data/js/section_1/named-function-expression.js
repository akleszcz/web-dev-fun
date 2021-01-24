const arr = [1, 2, 3, 4, 5];
const arrFactorial = arr.map(function fac(n) { return n < 2 ? 1 : n * fac(n - 1) });
console.log(arrFactorial);
