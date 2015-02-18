module.exports = exports = {};

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: {type: String, unique: true},
  age: String
});

exports.User = mongoose.model('User', userSchema);