var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/collection");

module.exports.Pet = require("./pets.js");
module.exports.Pet = require("./user.js");
