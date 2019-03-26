const fs = require('fs');
const https = require('https');
const express = require('express');
const axios = require('axios');
const nodemailer = require('nodemailer');
const recaptcha_secret = require('../config/keys').recaptcha_secret;
const router = express.Router();

// Setting up nodemailer with Gmail settings
const auth = JSON.parse(fs.readFileSync('./email-auth.json'));
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth
});

router.get('/', (req, res) => {
    res.render('main/index', { title: "Max Klopsch | Full-stack Web Developer | Portfolio", metaDescription: "Hey, I'm Max Klopsch. This is my personal website. I'm a full-stack web developer living in Nottingham, UK."});
});

router.get('/resume', (req, res) => {
    res.render('main/resume', { title: "Resume | Max Klopsch", metaDescription: "I'm Max Klopsch, a full-stack web developer living in Nottingham, UK. You can find my resume with my experience and skills here."});
});

router.get('/contact', (req, res) => {
    res.render('main/contact', { sent: false, title: "Contact Me | Max Klopsch", metaDescription: "Contact Max Klopsch to find out more about him. I am available for hire for freelance projects or the right full-time position." });
});

router.post('/contact', async (req, res) => {
    const recaptcha_token = req.body.token;
    try {
        const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', {
            secret: recaptcha_secret,
            response: recaptcha_token
        }, {
            port: 443,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (!response.data.score || response.data.score >= 0.5) {
            const mailOptions = {
                from: `"Max Klopsch Website" ${auth.user}`,
                to: auth.user,
                subject: 'New Contact Request Max Klopsch Website',
                html: `
                <p>You have a new contact request.</p>
                <h3>Contact Details:</h3>
                <ul>
                    <li>Name: ${req.body.name}</li>
                    <li>Email: ${req.body.email}</li>
                    <li>Phone: ${req.body.phone}</li>
                </ul>
                <h3>Message:</h3>
                <p>${req.body.message}</p>`
            };

            transporter.sendMail(mailOptions, function(err, info){
                if (err) throw err;

                console.log('Email sent: ' + info.response);
                res.render('main/contact', { sent: true, title: "Contact Me | Max Klopsch", metaDescription: "Contact Max Klopsch to find out more about him. I am available for hire for freelance projects or the right full-time position." });
            });
        } else {
            throw new Error('reCAPTCHA score too low');
        }
    } catch (err) {
        console.log(err);
        res.render('main/contact', { sent: "error", name: req.body.name, email: req.body.email, phone: req.body.phone, message: req.body.message, title: "Contact Me | Max Klopsch", metaDescription: "Contact Max Klopsch to find out more about him. I am available for hire for freelance projects or the right full-time position." });
    }
});

/**
 * Serve Four in a Row game
 */
router.get('/four-in-a-row', (req, res) => {
    res.sendFile(__basedir + '/public/html/four-in-a-row.html');
});

// Serve Vue.js book library app
router.get('/library', (req, res) => {
    res.sendFile(__basedir + '/public/html/vue-index.html');
});

// Serve Vue.js flashcards app
router.get('/flashcards', (req, res) => {
    res.sendFile(__basedir + '/public/html/vue-flashcards.html');
});

// Serve Vue.js news app
router.get('/news', (req, res) => {
    res.sendFile(__basedir + '/public/html/vue-news-app.html');
});

// Serve Bootstrap 4 Full Stack Conf Coming Soon page
router.get('/full-stack-conf-coming-soon', (req, res) => {
    res.sendFile(__basedir + '/public/html/bootstrap-4.html');
});

// Serve Bootstrap 4 Full Stack Conf Landing Page
router.get('/full-stack-conf', (req, res) => {
    res.sendFile(__basedir + '/public/html/bootstrap-4-full-stack-conf.html');
});

// Serve RSVP app
router.get('/rsvp', (req, res) => {
    res.sendFile(__basedir + '/public/html/rsvp-app.html');
});

// Serve Flexbox Best City Guid page
router.get('/best-city-guide', (req, res) => {
    res.sendFile(__basedir + '/public/html/flexbox.html');
});

module.exports = router;