global.__basedir = __dirname;

// Dependencies
require('dotenv').config()

const fs = require('fs');
const http = require('http');
const spdy = require('spdy');
const express = require('express');
const helmet = require('helmet');
const createError = require('http-errors');
const morgan = require('morgan');
const winston = require('./config/winston');
const compression = require('compression');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const passport = require('passport');

const keys = require('./config/keys');

// db instance connection
const db = require("./config/db");

const app = express();

app.use(morgan('combined', { stream: winston.stream }));

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
    secret: keys.session_secret,
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

// include routes
const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');
const apiRoutes = require('./routes/api/restApi');
const quote_rest_api_routes = require('./routes/api/quote_rest_api');
const bookAppRoutes = require('./routes/bookApp');
const passportAuthApp = require('./routes/passport-authentication');

app.use(mainRoutes);
app.use('/cards', cardRoutes);
app.use('/api/questions', jsonParser, apiRoutes);
app.use('/api/quotes', jsonParser, quote_rest_api_routes);
app.use('/books', jsonParser, bookAppRoutes);
app.use('/passport', passport.initialize(), passport.session(), flash(), passportAuthApp);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404, 'Not Found.'));
});

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
    // add winston logging
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.path} - ${req.method} - ${req.ip}`);

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.stack = app.get('env') === 'development' ? err.stack : false;

    // render the error page
    res.status(err.status || 500);
    res.locals.status = err.status || 500;
    if (req.originalUrl.startsWith('/books')) {
        res.render('bookworm/bookError', { baseUrl: '/books' });
    } else if (req.originalUrl.startsWith('/cards')) {
        res.render('flashcards/error');
    } else {
        res.render('main/error', {title: `Error ${res.locals.status} - ${res.locals.message} | Max Klopsch`, metaDescription: `An error has occured when you tried to visit this page: ${res.locals.status} - ${res.locals.message}`});
    }
});

// Starting both http & https servers
let PORT = 8080;
if (app.get("env") === "production") {
    const httpsServer = spdy.createServer(credentials, app);
    PORT = 80;
    httpsServer.listen(443, (error) => {
        if (error) {
            console.error(error);
            return process.exit(1);
        } else {
            console.log('HTTPS Server running on port 443');
        }
    });
}

const httpServer = http.createServer(app);
httpServer.listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT}`);
});