const express = require('express');
const router = express.Router();
const quotes = require('../config/quotes');

// Send a GET request to /quotes to READ a list of quotes
router.get('/', async (req, res, next) => {
    try {
        res.json(await quotes.getQuotes());
    } catch(err) {
        next(err);
    }
});

// Send a GET request to /quotes/:id to READ a quote
router.get('/:id', async (req, res, next) => {
    try {
        const quote = await quotes.getQuote(req.params.id);
        if (quote) {
            res.json(quote);
        } else {
            res.status(404).json({message: "Quote not found"});
        }
    } catch(err) {
        next(err);
    }
});

// Send a GET request to /quotes/random to READ a random quote
// Send a POST request to /quotes to CREATE a new quote
router.post('/', async (req, res, next) => {
    try {
        if (req.body.author && req.body.quote) {
            res.status(201).json(await quotes.createQuote({
                quote: req.body.quote,
                author: req.body.author
            }));
        } else {
            res.status(400).json({message: "Quote and author required"});
        }
    } catch(err) {
        next(err);
    }
});

// Send a PUT request to /quotes/:id to UPDATE a quote
router.put('/:id', async (req, res, next) => {
    try {
        const quote = await quotes.getQuote(req.params.id);
        if(quote) {
            quote.quote = req.body.quote;
            quote.author = req.body.author;
            await quotes.updateQuote(quote);
            res.status(204).end();
        } else {
            res.status(404).json({message: "Quote not found"});
        }
    } catch(err) {
        next(err);
    }
});

// Send a DELETE request to /quotes/:id to DELETE a quote
router.delete('/:id', async (req, res, next) => {
    try {
        const quote = await quotes.getQuote(req.params.id);
        if(quote) {
            await quotes.deleteQuote(quote);
            res.status(204).end();
        } else {
            res.status(404).json({message: "Quote not found"});
        }
    } catch(err) {
        next(err);
    }
});

router.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

router.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

module.exports = router;