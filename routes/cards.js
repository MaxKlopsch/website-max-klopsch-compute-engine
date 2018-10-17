const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
const {cards} = data;

router.get('/:id', (req, res) => {
    const {side} = req.query;
    const {id} = req.params;
    const text = cards[id][side];
    const {hint} = cards[id];
    const templateData = {text, hint, side};

    //  res.locals.prompt = "Who is buried in Grant's tomb?";
    res.render('card', templateData);
    //  res.render('card', {prompt: "Who is buried in Grant's tomb?"});
});

module.exports = router;