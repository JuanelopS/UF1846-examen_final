const quotes = document.querySelector('.quotes');

const URL = 'http://localhost:4000/scraper';

  /* Mediante fetch se recoge la promesa -> información enviada por index.js (backend),
  mediante un bucle map se recorre dicho JSON y con insertAdjacentHTML se va 'pintando'
  en el html (concretamente en la clase .products)  */

fetch(URL)
    .then(response => response.json())
    .then(data => data.map(({ author, text,tags }) => {
      quotes.insertAdjacentHTML('beforeend', 
      `
        <div class='quote'>
          <h2 class='author'>
            ${authorIcon(author)}
          </p>
          <p class='text-quote'>${text}</p>
          <p class='tags'>TAGS: ${tags.join(', ')}</p>
        </div>
      `);
    }))
    .catch(error => console.log(error));


function authorIcon(author) {
  switch (author) {
    case "Albert Einstein": {
      return "Albert Einstein 👨‍🦳";
    }
    case "J.K. Rowling": {
      return "J.K. Rowling 👩";
    }
    case "Jane Austen": {
      return "Jane Austen 👩‍🦱";
    }
    case "Marilyn Monroe": {
      return "Marilyn Monroe 👱‍♀️";
    }
    case "André Gide": {
      return "André Gide 👨‍🦲";
    }
    case "Thomas A. Edison": {
      return "Thomas A. Edison 💡";
    }
    case "Eleanor Roosevelt": {
      return "Eleanor Roosevelt 👩";
    }
    case "Steve Martin": {
      return "Steve Martin 🧓";
    }
    default: {
      return author;
    }
  }
}