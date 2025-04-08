const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    number: String,
    location: String
});

module.exports = mongoose.model("User", userSchema);
