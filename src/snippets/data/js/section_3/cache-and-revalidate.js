const p = new Promise(function (resolve, reject) {
  const cachedValue = localStorage.getItem('cachedValue');
  if (cachedValue) {
    resolve(cachedValue);
  }
  fetch('https://api.mocki.io/v1/0350b5d5')
    .then((response) => response.json())
    .then((updatedValue) => {
      console.log('Updating cached value...');
      localStorage.setItem('cachedValue', JSON.stringify(updatedValue));
      resolve(updatedValue);
    })
    .catch(reject);
});

p.then(result => console.log('Result: ', result));