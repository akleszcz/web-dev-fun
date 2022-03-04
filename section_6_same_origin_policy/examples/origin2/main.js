document.addEventListener('DOMContentLoaded', function () {
  const helloContainer = document.getElementById('hello-container');
  const helloContent = document.createTextNode(`Hello from ${window.location.origin}!`);
  helloContainer.appendChild(helloContent);

  const btn8080 = document.getElementById('open-8080');
  const btn8081 = document.getElementById('open-8081');

  const openGreeting = function (url) {
    const newWindow = window.open(url);
    newWindow.addEventListener('load', function () {
      const greetingContainer = newWindow.document.getElementById('greeting-container');
      const greetingContent = document.createTextNode(`Greeting from ${window.location.origin}!`);
      greetingContainer.appendChild(greetingContent);
    });
  }

  btn8080.addEventListener('click', function () {
    console.log('clicked!');
    openGreeting('http://localhost:8080/greeting.html');
  });

  btn8081.addEventListener('click', function () {
    openGreeting('http://localhost:8081/greeting.html');
  });
});
