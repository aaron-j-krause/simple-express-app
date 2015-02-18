exports = module.exports = {}

var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  number: Number,
  body: String
})

exports.Post = mongoose.model('Post', postSchema);
