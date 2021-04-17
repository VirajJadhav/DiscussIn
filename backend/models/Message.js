const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Message = mongoose.model(
  "messages",
  new Schema({}, { strict: false, timestamps: true })
);

module.exports = Message;
