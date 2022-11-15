const quotes = document.querySelector('.quotes');

const URL = 'http://localhost:4000/scraper';

  /* Mediante fetch se recoge la promesa -> información enviada por index.js (backend),
  mediante un bucle map se recorre dicho JSON y con insertAdjacentHTML se va 'pintando'
  en el html (concretamente en la clase .products)  */

fetch(URL)
    .then(response => response.json())
    .then(data => data.map(({ author, text }) => {
      quotes.insertAdjacentHTML('beforeend', 
      `
        <div class='quote'>
          <h2 class='author'>${author}</p>
          <p class='text-quote'>${text}</p>
        </div>
      `);
    }))
    .catch(error => console.log(error));