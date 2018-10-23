const fs = require('fs');
const mongoose = require("mongoose");

const dbURI = fs.readFileSync('../secret.txt', 'utf8');

const options = {
    // useMongoClient: true,
    useNewUrlParser: true
};

mongoose.connect(dbURI, options);

const db = mongoose.connection;

db.on("error", (err) => {
    console.error("Connection error:", err);
});

db.once("open", () => {
    console.log("DB connection successful");

});