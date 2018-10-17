const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
const {cards} = data;

router.get('/', (req, res) => {
    const cardId = Math.floor(Math.random() * cards.length); 
    res.redirect(`/cards/${cardId}?side=question`);
});

router.get('/:id', (req, res) => {
    const {side} = req.query;
    const {id} = req.params;

    if(!side) {
        res.redirect(`/cards/${id}?side=question`);
    } else {
        const text = cards[id][side];
        const {hint} = cards[id];
        const templateData = {id, text};

        if(side === 'question') {
            templateData.hint = hint;
            templateData.sideToShow = 'answer';
            templateData.sideToShowDisplay = 'Answer';
        } else if(side === 'answer') {
            templateData.sideToShow = 'question';
            templateData.sideToShowDisplay = 'Question';
        }

        //  res.locals.prompt = "Who is buried in Grant's tomb?";
        res.render('card', templateData);
        //  res.render('card', {prompt: "Who is buried in Grant's tomb?"});
    }
});

module.exports = router;