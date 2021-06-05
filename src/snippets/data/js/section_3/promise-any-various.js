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

Promise.any([sleep(2), sleep(1), sleep(5)]).then((result) => console.log('Result: ', result));

Promise.any([sleep(2), 1, sleep(5)]).then((result) => console.log('Result: ', result));

Promise.any([sleep(2, true), sleep(1), sleep(5)])
  .then((result) => console.log('Result: ', result))
  .catch((error) => console.error('Error: ', error));

Promise.any([sleep(2, true), sleep(1, true), sleep(5, true)])
  .then((result) => console.log('Result: ', result))
  .catch((error) => console.error('Error: ', error));
