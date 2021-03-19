const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = mongoose.model("users", new Schema({}, { strict: false }));

module.exports = User;
