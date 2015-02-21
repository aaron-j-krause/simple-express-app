module.exports = exports = {};

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var userSchema = mongoose.Schema({
  basic:{
    email: {type: String, unique: true},
    password: String
  },
  name: String,
  age: Number
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};

userSchema.methods.generateToken = function(appSecret, password) {
  return eat.encode({id: this._id, timestamp: new Date()}, appSecret, callback)
};

module.exports = mongoose.model('User', userSchema);
