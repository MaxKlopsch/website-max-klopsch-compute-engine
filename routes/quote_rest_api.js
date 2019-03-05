const express = require('express');
const router = express.Router();
const data = require('../data/quotes.json');

// Send a GET request to /quotes to READ a list of quotes
router.get('/', (req, res) => {
    res.json(data);
});

// Send a GET request to /quotes/:id to READ a quote
// Send a GET request to /quotes/random to READ a random quote
// Send a POST request to /quotes to CREATE a new quote
// Send a PUT request to /quotes/:id to UPDATE a quote
// Send a DELETE request to /quotes/:id to DELETE a quote

module.exports = router;