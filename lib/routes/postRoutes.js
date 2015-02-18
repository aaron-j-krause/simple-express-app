var express = require('express');
var router = express.Router();
var Post = require('../schema/postSchema').Post;
var User = require('../schema/userSchema').User;
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/:name/posts', function(req, res){
  User.findOne({name: req.params.name}, function(err, user){
    if (err) return error;
    var id = user.id;
    var obId = new ObjectId(id);
    console.log(id, typeof id, obId, typeof obId);
    res.send(id);
  });
  //console.log('ID', id);
  //res.send(id);
})

router.post('/:name/newpost', function(req, res){

})

module.exports = router;