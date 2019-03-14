const express = require('express');
const router = express.Router();
const quotes = require('../config/quotes');

// Send a GET request to /quotes to READ a list of quotes
router.get('/', async (req, res) => {
    res.json(await quotes.getQuotes());
});

// Send a GET request to /quotes/:id to READ a quote
router.get('/:id', async (req, res) => {
    res.json(await quotes.getQuote(req.params.id));
});

// Send a GET request to /quotes/random to READ a random quote
// Send a POST request to /quotes to CREATE a new quote
// Send a PUT request to /quotes/:id to UPDATE a quote
// Send a DELETE request to /quotes/:id to DELETE a quote

module.exports = router;