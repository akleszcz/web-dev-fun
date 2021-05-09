function sleep(nbrOfSeconds, shouldFail) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (shouldFail) {
        console.log('I am about to reject.');
        reject(new Error(`Rejected after ${nbrOfSeconds} second(s)`));
      } else {
        console.log('I am about to resolve.');
        resolve(`Resolved after ${nbrOfSeconds} second(s)`);
      }
    }, nbrOfSeconds * 1000);
  });
}

const p = Promise.race([sleep(2), sleep(1, true)]);
console.log('p: ', p);
p
  .then((result) => console.log('result:', result))
  .catch((error) => console.error('error:', error));