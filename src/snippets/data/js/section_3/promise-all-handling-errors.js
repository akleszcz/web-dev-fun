Promise.all([
  sleep(2, true).catch(console.error),
  sleep(1, true).catch(console.error),
  sleep(5, true).catch(console.error),
])
  .then((result) => console.log('Fulfillment handler called with result: ', result))
  .catch((error) => console.error('Rejection handler called with error: ', error));
