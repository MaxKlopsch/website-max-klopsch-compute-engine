const express = require('express');
const router = express.Router();
const quotes = require('../config/quotes');

// Send a GET request to /quotes to READ a list of quotes
router.get('/', async (req, res) => {
    try {
        res.json(await quotes.getQuotes());
    } catch(err) {
        res.json({message: err.message});
    }
});

// Send a GET request to /quotes/:id to READ a quote
router.get('/:id', async (req, res) => {
    try {
        res.json(await quotes.getQuote(req.params.id));
    } catch(err) {
        res.json({message: err.message});
    }
});

// Send a GET request to /quotes/random to READ a random quote
// Send a POST request to /quotes to CREATE a new quote
router.post('/', async (req, res) => {
    try {
        res.json(await quotes.createQuote({
            quote: req.body.quote,
            author: req.body.author
        }));
    } catch(err) {
        res.json({message: err.message});
    }
});

// Send a PUT request to /quotes/:id to UPDATE a quote
// Send a DELETE request to /quotes/:id to DELETE a quote

module.exports = router;