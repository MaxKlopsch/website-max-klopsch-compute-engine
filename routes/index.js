const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/flashcards', (req, res) => {
    res.render('flashcards');
});

router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if(name) {
        res.redirect('/home');
    } else {
        res.render('hello');
    }
});

router.get('/home', (req, res) => {
    const name = req.cookies.username;
    if(name) {
        res.render('home', {name});
    } else {
        res.redirect('/hello');
    }
});

router.post('/hello', (req, res) => {
    // console.log(req.body);
    res.cookie('username', req.body.username);
    res.redirect('/home');
});

router.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

router.get('/test', (req, res) => {
    res.status(200).send('<h1>This is the test page!</h1>').end();
});


module.exports = router;