var express = require('express');
var router = express.Router();

// GET /
router.get('/', (req, res) => {
    res.render('bookIndex', { title: 'Home' });
});
  
// GET /about
router.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});
  
// GET /contact
router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});
  
  module.exports = router;