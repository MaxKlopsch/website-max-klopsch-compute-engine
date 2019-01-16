const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('main/index', { title: "Max Klopsch | Full-stack Web Developer | Portfolio", metaDescription: "Hey, I'm Max Klopsch. This is my personal website. I'm a full-stack web developer living in Nottingham, UK."});
});

router.get('/resume', (req, res) => {
    res.render('main/resume', { title: "Resume | Max Klopsch", metaDescription: "I'm Max Klopsch, a full-stack web developer living in Nottingham, UK. You can find my resume with my experience and skills here."});
});

router.get('/contact', (req, res) => {
    res.render('main/contact', { sent: false, title: "Contact Me | Max Klopsch", metaDescription: "Contact Max Klopsch to find out more about him. I am available for hire for freelance projects or the right full-time position." });
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