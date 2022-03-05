'use strict';
const o = {
  x: 5
};

Object.seal(o);
o.x = 100;
o.y = 200;
