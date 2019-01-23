const fs = require('fs');
const mongoose = require("mongoose");

const dbURI = require('./keys').MongoURI;

const options = {
    useNewUrlParser: true
};

mongoose.connect(dbURI, options);
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;

db.on("error", (err) => {
    console.error("Connection error:", err);
});

db.once("open", () => {
    console.log("MongoDB connection successful");
});

module.exports.db = db;