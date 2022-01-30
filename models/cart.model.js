const mongoose = require("mongoose");

const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema({
    cartNumber: String,
    month: Number,
    year: Number,
    default: String
  })
);

module.exports = Cart;