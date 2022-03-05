try {
  console.log('k before the function:', k);
} catch (error) {
  console.log('error: ', error);
}
function f(o) {
  console.log('k before the if block:', k);
  if (o) {
    var j = 0;
    console.log('k before the loop:', k);
    for (var k = 0; k < 10; k++) {
      console.log('k from the loop:', k);
    }
    console.log('k after the loop:', k);
  }
  console.log('j after the if block:', j);
}
f({});