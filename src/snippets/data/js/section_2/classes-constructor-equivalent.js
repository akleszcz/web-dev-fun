let Panda = (function () {
  'use strict';
  const Panda = function (name) {
    if (typeof new.target === 'undefined') {
      throw new Error('Constructor must be called with new.');
    }
    this.name = name;
  }
  Object.defineProperty(Panda.prototype, 'sayHello', {
    value: function () {
      if (typeof new.target !== 'undefined') {
        throw new Error('Method cannot be called with new.');
      }
      console.log('Hello, my name is ' + this.name + '!');
    },
    enumerable: false,
    writable: true,
    configurable: true
  });
  return Panda;
}());