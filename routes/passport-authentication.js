const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

// User model
const User = require('../config/models/passport-user');

// Global variables
router.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// make baseUrl available in templates
router.use((req, res, next) => {
    res.locals.baseUrl = req.baseUrl;
    next();
});

// Welcome Page
router.get('/', (req, res) => {
    res.render('passportAuthApp/welcome');
});

// Login Page
router.get('/login', (req, res) => {
    res.render('passportAuthApp/login');
});

// Registration Page
router.get('/register', (req, res) => {
    res.render('passportAuthApp/register');
});

// Registration Handler
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({msg: 'Please fill in all required fields.'});
    }

    // Check passwords match
    if (password !== password2) {
        errors.push({msg: 'Passwords do not match.'});
    }

    // Check password length
    if (password.length < 6) {
        errors.push({msg: 'Password should be at least 6 characters long.'});
    }

    if (errors.length > 0) {
        // Display errors and show registration page again
        res.render('passportAuthApp/register', { errors, name, email, password, password2 });
    } else {
        // Validation passed
        User.findOne({ email: email })
        .then(user => {
            if (user) {
                // User exists
                errors.push({msg: 'Email is already registered.'});
                res.render('passportAuthApp/register', { errors, name, email, password, password2 });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                // Hash Password
                bcrypt.hash(newUser.password, 10, (err, hash) => {
                    if(err) throw err;
                    // Set password to hashed
                    newUser.password = hash;
                    // Save user
                    newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'You are now registered and can log in.');
                            res.redirect(`${req.baseUrl}/login`);
                        })
                        .catch(err => console.error(err));
                });
            }
        });
    }
});

// Login Handler
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: `${req.baseUrl}/dashboard`,
        failureRedirect: `${req.baseUrl}/login`,
        failureFlash: true
    })(req, res, next);
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('passportAuthApp/dashboard', {
        name: req.user.name
    });
});

// Logout Handler
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are now logged out.');
    res.redirect('login');
});

module.exports = router;