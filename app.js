// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
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
app.use(cookieParser());
app.use(express.static('public'));

app.set('view engine', 'pug');

// Used to serve static file for Let's Encrypt certificate
// Needs limiting to only public static file and see if still needed to renew certificate
// app.use(express.static(__dirname, { dotfiles: 'allow' } ));

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');
const apiRoutes = require('./routes/restApi');

app.use(mainRoutes);
app.use('/cards', cardRoutes);
app.use('/questions', jsonParser, apiRoutes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status || 500);
    res.render('error');
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