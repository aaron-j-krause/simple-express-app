module.exports = exports = {};

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: {type: String, unique: true},
  age: Number
});

module.exports = mongoose.model('User', userSchema);
