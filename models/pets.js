var mongoose = require('mongoose');

var PetsSchema = new mongoose.Schema({
  petName: String,
  breed: String,
  age: Number,
  energy: String,
  imageurl: String
});

var Pet = mongoose.model('Pet', PetsSchema);

module.exports = Pet;
