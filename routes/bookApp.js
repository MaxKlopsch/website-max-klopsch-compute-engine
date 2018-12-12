var express = require('express');
var router = express.Router();
const User = require("../config/models/user")

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

            // confirm that user typed in the same password twice
            if (req.body.password !== req.body.confirmPassword) {
                const err = new Error("Passwords do not match.");
                err.status = 400;
                return next(err);
            }

            // create object with form input
            const userData = {
                email: req.body.email,
                name: req.body.name,
                favoriteBook: req.body.favoriteBook,
                password: req.body.password
            }

            // use schema's 'create' method to insert document into Mongo
            User.create(userData, (error, user) => {
                if (error) {
                    return next(error);
                } else {
                    return res.redirect(`profile`);
                }
            });
        } else {
            const err = new Error("All fields required.");
            err.status = 400;
            return next(err);
        }
});

// GET /login
router.get('/login', (req, res) => {
    res.render('login', { title: 'Log In', baseUrl: req.baseUrl });
});

// POST /login
router.post('/login', (req, res, next) => {
    if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, function(error, user) {
            if (error || !user) {
                const err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                // create a new session
                req.session.userId = user._id;
                return res.redirect('profile');
            }
        });
    } else {
        const err = new Error("Email and password are required.");
        err.status = 401;
        return next(err);
    }
});
  
  module.exports = router;