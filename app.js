// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/maxklopsch.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/maxklopsch.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/maxklopsch.com/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser());

app.set('view engine', 'pug');

// Used to serve static file for Let's Encrypt certificate
// Needs limiting to only public static file and see if still needed to renew certificate
// app.use(express.static(__dirname, { dotfiles: 'allow' } ));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/flashcards', (req, res) => {
    res.render('flashcards');
});

app.get('/cards', (req, res) => {
    const colors = [
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'purple'
    ];
    //  res.locals.prompt = "Who is buried in Grant's tomb?";
    res.locals = {
        prompt: "Who is buried in Grant's tomb?",
        hint: "Think about whose tomb it is.",
        colors: colors
    };
    res.render('card');
    //  res.render('card', {prompt: "Who is buried in Grant's tomb?"});
});

app.get('/hello', (req, res) => {
    res.render('hello', {name: req.cookies.username});
});

app.post('/hello', (req, res) => {
    // console.log(req.body);
    res.cookie('username', req.body.username);
    res.render('hello', {name: req.body.username});
});

app.get('/test', (req, res) => {
    res.status(200).send('<h1>This is the test page!</h1>').end();
});

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// Usage: sudo PORT=80 npm start
const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT}`);
});
httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});