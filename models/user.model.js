const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    date_naissance: Date,
    sexe: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    carts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
      }
    ],
    subscription: Number
  },
  { timestamps: true })
);

module.exports = User;
