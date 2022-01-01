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
/* TODO see if possible to find other validator package or fix mongoose bug  #131 */

/* userSchema.plugin(uniqueValidator);
 */
module.exports = mongoose.model("User", userSchema);
