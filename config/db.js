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

    const Schema = mongoose.Schema;
    const AnimalSchema = new Schema({
        type: String,
        size: String,
        color: String,
        mass: Number,
        name: String
    });

    const Animal = mongoose.model("Animal", AnimalSchema);

    const elephant = new Animal({
        type: "elephant",
        size: "big",
        color: "gray",
        mass: 6000,
        name: "Lawrence"
    });

    elephant.save((err) => {
        if(err) {
            console.error("Save Failed.", err);
        } else {
            console.log("Saved!");
        }
        db.close(() => {
            console.log("DB connection closed.");
        });
    });
});