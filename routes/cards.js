const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
const {cards} = data;

router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if(name) {
        res.redirect('/cards/home');
    } else {
        res.render('flashcards/hello');
    }
});

router.get('/home', (req, res) => {
    const name = req.cookies.username;
    if(name) {
        res.render('flashcards/home', {name});
    } else {
        res.redirect('/cards/hello');
    }
});

router.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/cards/home');
});

router.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/cards/hello');
});

router.get('/', (req, res) => {
    const cardId = Math.floor(Math.random() * cards.length);
    res.redirect(`/cards/${cardId}?side=question`);
});

router.get('/:id', (req, res) => {
    const {side} = req.query;
    const {id} = req.params;

    if(!side) {
        return res.redirect(`/cards/${id}?side=question`);
    }

    const text = cards[id][side];
    const {hint} = cards[id];
    const name = req.cookies.username;
    const templateData = {id, text, name, side};

    if(side === 'question') {
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    } else if(side === 'answer') {
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }

    //  res.locals.prompt = "Who is buried in Grant's tomb?";
    res.render('flashcards/card', templateData);
    //  res.render('card', {prompt: "Who is buried in Grant's tomb?"});
});

module.exports = router;