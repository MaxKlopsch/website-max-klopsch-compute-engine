var express = require('express');
var router = express.Router();
const User = require("../config/user")

// GET /
router.get('/', (req, res) => {
    res.render('bookIndex', { title: 'Home', baseUrl: req.baseUrl });
});
  
// GET /about
router.get('/about', (req, res) => {
    res.render('about', { title: 'About', baseUrl: req.baseUrl });
});
  
// GET /contact
router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact', baseUrl: req.baseUrl });
});

// GET /register
router.get('/register', (req, res) => {
    res.render('register', { title: 'Sign Up', baseUrl: req.baseUrl });
});

// POST /register
router.post('/register', (req, res, next) => {
    if (req.body.email &&
        req.body.name &&
        req.body.favoriteBook &&
        req.body.password &&
        req.body.confirmPassword) {

        } else {
            const err = new Error("All fields required.");
            err.status = 400;
            return next(err);
        }
});
  
  module.exports = router;