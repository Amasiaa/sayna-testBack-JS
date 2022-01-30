const { Double } = require("mongodb");
const mongoose = require("mongoose");

const Bill = mongoose.model(
  "Bill",
  new mongoose.Schema({
    id_Stripe: String,
    date_payment: Date,
    montant_ht: Number,
    montant_ttc: Number,
    source: String
  },
  { timestamps: true })
);

module.exports = Bill;