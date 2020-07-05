/* ========= Type checking in a for-each loop ========= */
var arr = ['a', 'bb', 'ccc', 'dddd'];
arr.forEach(function (item, index) {
    console.log("item: " + index + ":", item);
});
/* ========= Function parameters type checking ========= */
function add(x, y) {
    return x + y;
}
console.log('add(2, 5): ', add(2, 5));
// console.log('add(2, 5): ', add('2', 5)); // error: "Argument of type '"2"' is not assignable to parameter of type 'number'."
// Runtime type checking version
function add2(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
        throw new TypeError('x and y need to be numbers');
    }
    return x + y;
}
/* ========= Access modifiers ========= */
var Spy = /** @class */ (function () {
    function Spy(_trueName, fakeName) {
        this._trueName = _trueName;
        this.fakeName = fakeName;
    }
    return Spy;
}());
var spy = new Spy('Ivan', 'John');
// console.log(`Spy's true name:`, spy._trueName); // error: Property '_trueName' is private and only accessible within class 'Spy'
console.log("Spy's fake name:", spy.fakeName);
