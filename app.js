global.__basedir = __dirname;

// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const nodemailer = require('nodemailer');
const flash = require('connect-flash');
const passport = require('passport');

// db instance connection
const db = require("./config/db");

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

// secure app, use HTTPS, etc.
app.use(helmet());

// compress all responses
app.use(compression());

// Allow CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use((req, res, next) => {
    if (req.headers.host.slice(0, 4) === 'www.') {
        var newHost = req.headers.host.slice(4);
        return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
    } else {
        next();
    }
});

// use sessions for tracking logins
app.use(session({
    secret: fs.readFileSync('session-secret.txt', 'utf8'),
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db.db
    })
}));

// make user ID available in templates
app.use((req, res, next) => {
    res.locals.currentUser = req.session.userId;
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('public'));

// Passport config
require('./config/passport')(passport);

// view engine setup
app.set('view engine', 'pug');
app.set('views', 'views');

// Setting up nodemailer with Gmail settings
const auth = JSON.parse(fs.readFileSync('email-auth.json'));
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth
});

// Used to serve static file for Let's Encrypt certificate
// Needs limiting to only public static file and see if still needed to renew certificate
// app.use(express.static(__dirname, { dotfiles: 'allow' } ));

// include routes
const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');
const apiRoutes = require('./routes/restApi');
const bookAppRoutes = require('./routes/bookApp');
const passportAuthApp = require('./routes/passport-authentication');

app.use(mainRoutes);
app.use('/cards', cardRoutes);
app.use('/questions', jsonParser, apiRoutes);
app.use('/books', jsonParser, bookAppRoutes);
app.use('/passport', passport.initialize(), passport.session(), flash(), passportAuthApp);

app.post('/contact', (req, res) => {

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

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.render('main/contact', { sent: "error", name: req.body.name, email: req.body.email, phone: req.body.phone, message: req.body.message });
        } else {
            console.log('Email sent: ' + info.response);
            res.render('main/contact', { sent: true });
        }
    });
});

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
        res.render('bookworm/bookError', { message: err.message, baseUrl: '/books' });
    } else if (req.originalUrl.startsWith('/cards')) {
        res.render('flashcards/error');
    } else {
        res.render('main/error', {title: `Error ${err.status} - ${err.message} | Max Klopsch`, metaDescription: `An error has occured when you tried to visit this page: ${err.status} - ${err.message}`});
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