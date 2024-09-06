document.getElementById('uvBtn').addEventListener('click', function() {
  fetchProxy('https://dented-season-nation.glitch.me/proxy?url=' + encodeURIComponent(document.getElementById('proxurl').value));
});

function fetchProxy(url) {
  const iframe = document.getElementById('iframe');
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      iframe.srcdoc = data;
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}
