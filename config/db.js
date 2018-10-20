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
        type: {type: String, default: "goldfish"},
        size: {type: String, default: "small"},
        color: {type: String, default: "golden"},
        mass: {type: Number, default: 0.007},
        name: {type: String, default: "Garry"}
    });

    const Animal = mongoose.model("Animal", AnimalSchema);

    const elephant = new Animal({
        type: "elephant",
        size: "big",
        color: "gray",
        mass: 6000,
        name: "Lawrence"
    });

    const animal = new Animal({}); // Goldfish

    Animal.remove({}, () => {
        elephant.save((err) => {
            if(err) {
                console.error("Save Failed.", err);
            } else {
                animal.save(() => {
                    if(err) {
                        console.error("Save Failed.", err);
                    } else {
                        db.close(() => {
                            console.log("DB connection closed.");
                        });
                    }
                });  
            }  
        });
    });

});