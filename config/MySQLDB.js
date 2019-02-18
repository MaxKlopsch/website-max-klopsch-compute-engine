// Dependencies
const mysql = require('mysql');
const keys = require('./keys');

// MySQL connection
const db = mysql.createConnection({
    host: keys.MySQLHost,
    user: keys.MySQLUser,
    password: keys.MySQLPW,
    database: keys.MySQLDB
});

// Connect to MySQL DB
db.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return 1;
    } else {
        console.log('MySQL connected...');
    }
});

module.exports.db = db;