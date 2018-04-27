var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/furriends");

module.exports.Pet = require("./pets.js");

module.exports.User = require("./user.js");
