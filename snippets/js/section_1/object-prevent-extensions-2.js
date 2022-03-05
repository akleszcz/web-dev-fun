'use strict';
const o = {};
Object.preventExtensions(o);
console.log(Object.isExtensible(o));
o.x = 5;
console.log(o.x);
