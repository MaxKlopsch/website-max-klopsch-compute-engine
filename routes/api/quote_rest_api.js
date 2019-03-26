const express = require('express');
const router = express.Router();
const quotes = require('../../config/quotes');

function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (err) {
            next(err);
        }
    };
}

// Send a GET request to /quotes to READ a list of quotes
router.get('/', asyncHandler(async (req, res, next) => {
    res.json(await quotes.getQuotes());
}));

// Send a GET request to /quotes/:id to READ a quote
router.get('/:id', asyncHandler(async (req, res, next) => {
    const quote = await quotes.getQuote(req.params.id);
    if (quote) {
        res.json(quote);
    } else {
        res.status(404).json({message: "Quote not found"});
    }
}));

// Send a GET request to /quotes/random to READ a random quote
router.get('/random', asyncHandler(async (req, res, next) => {
    res.json(await quotes.getRandomQuote());
}));

// Send a POST request to /quotes to CREATE a new quote
router.post('/', asyncHandler(async (req, res, next) => {
    if (req.body.author && req.body.quote) {
        res.status(201).json(await quotes.createQuote({
            quote: req.body.quote,
            author: req.body.author
        }));
    } else {
        res.status(400).json({message: "Quote and author required"});
    }
}));

// Send a PUT request to /quotes/:id to UPDATE a quote
router.put('/:id', asyncHandler(async (req, res, next) => {
    const quote = await quotes.getQuote(req.params.id);
    if(quote) {
        quote.quote = req.body.quote;
        quote.author = req.body.author;
        await quotes.updateQuote(quote);
        res.status(204).end();
    } else {
        res.status(404).json({message: "Quote not found"});
    }
}));

// Send a DELETE request to /quotes/:id to DELETE a quote
router.delete('/:id', asyncHandler(async (req, res, next) => {
    const quote = await quotes.getQuote(req.params.id);
    if(quote) {
        await quotes.deleteQuote(quote);
        res.status(204).end();
    } else {
        res.status(404).json({message: "Quote not found"});
    }
}));

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