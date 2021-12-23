const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    pets: [{ type: mongoose.Types.ObjectId, ref: "Pet" }],
});

/* TODO look up what happens with error in unique validator if email is not unique */
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
