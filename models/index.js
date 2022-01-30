const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.cart = require("./cart.model");
db.song = require("./song.model");
db.bill = require("./bill.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
