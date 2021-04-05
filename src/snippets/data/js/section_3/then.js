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

sleep(1, false).then(
  (result) => {
    console.log('result: ', result);
  },
  (error) => {
    console.error('error: ', error);
  }
);

sleep(1, true).then(
  (result) => {
    console.log('result: ', result);
  },
  (error) => {
    console.error('error: ', error);
  }
);
