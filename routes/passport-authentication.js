const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('passportAuthApp/welcome');
});

router.get('/login', (req, res) => {
    res.render('passportAuthApp/login');
});

router.get('/register', (req, res) => {
    res.render('passportAuthApp/register');
});

module.exports = router;