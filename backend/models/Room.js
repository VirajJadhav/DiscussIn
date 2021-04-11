const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Room = mongoose.model(
  "rooms",
  new Schema({}, { strict: false, timestamps: true })
);

module.exports = Room;
