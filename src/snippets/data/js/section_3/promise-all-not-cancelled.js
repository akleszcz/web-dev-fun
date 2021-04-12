function sleep(nbrOfSeconds, shouldFail) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (shouldFail) {
        const errorMsg = `Rejected after ${nbrOfSeconds} second(s)`;
        console.error(errorMsg);
        reject(new Error(errorMsg));
      } else {
        const msg = `Resolved after ${nbrOfSeconds} second(s)`;
        console.log(msg);
        resolve(msg);
      }
    }, nbrOfSeconds * 1000);
  });
}

Promise.all([sleep(0, true), sleep(2)])
  .then((result) => console.log('Result: ', result))
  .catch((error) => console.error('Error: ', error));