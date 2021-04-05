function sleep(nbrOfSeconds, shouldFail) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (shouldFail) {
        reject(new Error(`Rejected after ${nbrOfSeconds} seconds`));
      } else {
        resolve(`Resolved after ${nbrOfSeconds} second(s)`);
      }
    }, nbrOfSeconds * 1000);
  });
}

let isPromiseSettled = false;
sleep(1, false) // sleep(1, true)
  .finally(() => {
    isPromiseSettled = true;
    console.log('isPromiseSettled: ', isPromiseSettled); // isPromiseSettled:  true
  });
