const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
const {cards} = data;

router.get('/:id', (req, res) => {
    const colors = [
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'purple'
    ];
    //  res.locals.prompt = "Who is buried in Grant's tomb?";
    res.locals = {
        prompt: cards[req.params.id].question,
        hint: cards[req.params.id].hint,
        colors: colors
    };
    res.render('card');
    //  res.render('card', {prompt: "Who is buried in Grant's tomb?"});
});

module.exports = router;