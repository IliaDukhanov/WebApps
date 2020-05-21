const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnimalSchema =  new Schema({
    name: String,
    width: Number,
    height: Number,
    colour: String,
    image: String,
});

const Animal = mongoose.model("animal", AnimalSchema);

module.exports = Animal;