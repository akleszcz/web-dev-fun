const _ = require('lodash');

function calculateSubtotal(items) {
  return _.sumBy(items, ({ price, quantity }) => price * quantity);
}

module.exports = { calculateSubtotal };
