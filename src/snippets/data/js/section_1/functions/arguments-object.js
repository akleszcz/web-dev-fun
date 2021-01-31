function max() {
  var max = Number.NEGATIVE_INFINITY;
  for (var i = 0; i < arguments.length; i++)
    if (arguments[i] > max) max = arguments[i];
  return max;
}
var largest = max(1, 10, 100, 2, 3, 1000, 4, 5, 10000, 6);