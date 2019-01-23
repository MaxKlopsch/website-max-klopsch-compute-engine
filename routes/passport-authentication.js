const express = require('express');
const router = express.Router();

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
        res.render('passportAuthApp/register', { errors, name, email, password, password2 });
    } else {
        res.send('Passed');
    }
});

module.exports = router;