document.addEventListener('DOMContentLoaded', function () {
  const btn8080 = document.getElementById('fetch-from-8080');
  const btn8081 = document.getElementById('fetch-from-8081');

  const fetchPandas = function (url) {
    fetch(`${url}/pandas.json`)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  btn8080.addEventListener('click', function () {
    fetchPandas('http://localhost:8080');
  });

  btn8081.addEventListener('click', function () {
    fetchPandas('http://localhost:8081');
  });
});
