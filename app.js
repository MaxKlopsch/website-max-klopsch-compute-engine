global.__basedir = __dirname;

// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cookieParser = require('cookie-parser');
const session = require('express-session');

// db instance connection
require("./config/db");

const app = express();

// Certificate
let privateKey, certificate, ca, credentials;
if (app.get("env") === "production") {
    privateKey = fs.readFileSync('/etc/letsencrypt/live/maxklopsch.com/privkey.pem', 'utf8');
    certificate = fs.readFileSync('/etc/letsencrypt/live/maxklopsch.com/cert.pem', 'utf8');
    ca = fs.readFileSync('/etc/letsencrypt/live/maxklopsch.com/chain.pem', 'utf8');

    credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };
}

app.use(helmet());
app.use(session({
    secret: fs.readFileSync('session-secret.txt', 'utf8'),
    resave: true,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', 'views');

// Used to serve static file for Let's Encrypt certificate
// Needs limiting to only public static file and see if still needed to renew certificate
// app.use(express.static(__dirname, { dotfiles: 'allow' } ));

// include routes
const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');
const apiRoutes = require('./routes/restApi');
const bookAppRoutes = require('./routes/bookApp');

app.use(mainRoutes);
app.use('/cards', cardRoutes);
app.use('/questions', jsonParser, apiRoutes);
app.use('/books', jsonParser, bookAppRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status || 500);
    if (req.originalUrl.startsWith('/books')) {
        res.render('bookError', { message: err.message, baseUrl: '/books' });
    } else {
        res.render('error');
    }
});

// Starting both http & https servers
const httpServer = http.createServer(app);
let httpsServer;
if (app.get("env") === "production") {
    httpsServer = https.createServer(credentials, app);
}

// Usage: sudo npm start
let PORT;
if (app.get("env") === "production") {
    PORT = 80;
} else {
    PORT = 8080;
}

httpServer.listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT}`);
});
if (app.get("env") === "production") {
    httpsServer.listen(443, () => {
        console.log('HTTPS Server running on port 443');
    });
}