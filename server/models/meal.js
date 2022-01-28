const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
    time: { type: Date, required: true },
    pet: { type: mongoose.Types.ObjectId, ref: "Pet", required: true },
    comment: { type: String },
    feeder: { type: mongoose.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Meal", mealSchema);
