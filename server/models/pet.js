const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String, default: "/lucifer.png" },
    maxMeals: { type: Number, min: 1, default: 2 },
});

module.exports = mongoose.model("Pet", petSchema);
