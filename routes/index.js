const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('main/index');
});

router.get('/resume', (req, res) => {
    res.render('main/resume');
});

router.get('/contact', (req, res) => {
    res.render('main/contact', { sent: false });
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