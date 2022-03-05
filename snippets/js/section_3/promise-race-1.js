function sleep(nbrOfSeconds, shouldFail) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (shouldFail) {
        reject(new Error(`Rejected after ${nbrOfSeconds} second(s)`));
      } else {
        resolve(`Resolved after ${nbrOfSeconds} second(s)`);
      }
    }, nbrOfSeconds * 1000);
  });
}

const p = Promise.race([sleep(2), Promise.resolve(1)]);
console.log('p: ', p);
setTimeout(function () {
  console.log('p:', p);
});
p
  .then((result) => console.log('result:', result))
  .catch((error) => console.error('error:', error));