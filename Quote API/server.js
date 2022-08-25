const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`)
});

// Send back a random quote from the quotes data => GET '/api/quotes/random'
app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = {quote: getRandomElement(quotes)};
    res.send(randomQuote);
    
});

// Send back all quotes if the request has no query params -> '/api/quotes'
app.get('/api/quotes', (req, res, next)=> {
    const hasParams = !(Object.entries(req.query).length === 0);
    let responseQuotes = { quotes: quotes};
    if (hasParams) {
        const author = req.query.person;
        responseQuotes = { quotes: quotes.filter(quote => quote.person === author) };
        res.send(responseQuotes);
    } else {
        res.send(responseQuotes);
    }
});

// Add a new quote to the data -> '/api/quotes'
app.post('/api/quotes', (req, res, next) => {
    const person = req.query.person;
    const quote = req.query.quote;

    if (person && quote) {
        const newQuote = {
            quote: quote,
            person: person
        }

        quotes.push(newQuote);
        res.status(201).send({quote: newQuote});
    } else {
        res.status(401).send();
    }


});