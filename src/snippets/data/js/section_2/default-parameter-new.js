function getPropertyNames(o, /* optional */ a = []) {
  for (var property in o) a.push(property);
  return a;
}

var o = { name: 'Harry', lastname: 'Potter' };
var p = { name: 'Garfield', species: 'cat', favouriteFood: 'lasagna' };

var a = getPropertyNames(o);
console.log(a);
getPropertyNames(p, a);
console.log(a);