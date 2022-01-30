const mongoose = require("mongoose");

const Song = mongoose.model(
  "Song",
  new mongoose.Schema({
    name: String,
    url: String,
    cover: String,
    time: String,
    type: String
  },
  { timestamps: true })
);

module.exports = Song;