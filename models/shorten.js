const mongoose = require("mongoose");
const shortId = require("shortid");

const shortenSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  shorten: {
    type: String,
    default: shortId.generate(),
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("shorten", shortenSchema);
