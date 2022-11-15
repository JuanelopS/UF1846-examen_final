const express = require('express');
const cheerio = require('cheerio');
const { join } = require('path');
const axios = require('axios');

const app = express();
const PORT = 4000;
const URL = "https://quotes.toscrape.com/";

app.use(express.static(join(__dirname, 'public')));

app.get('/scraper', (req, res) => {

    /* mediante axios (fetch) y cheerio se recorre el html, y con el método each se 
    se busca en el interior de la/s clase/s .thumbnail -> name / price / description,
    y lo voy almacenando en un array haciendo uso de un spread operator [...] el cual se
    exporta como json */

    axios(URL)
        .then(response => {
            //console.log(response.data);
            const html = response.data;

            const $ = cheerio.load(html)

            let quotes = [];
            $(".quote", html).each(function () {
              const author = $(this).find("small.author").text();
              const text = $(this).find("span.text").text();
              const tags = $(this).find("div.tags").text().split('\n').map(string => string.trim()).filter(tag => tag != "").splice(1);
              quotes = [...quotes, { author, text, tags }]; 
            });
            res.json(quotes);
        })
        .catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`))