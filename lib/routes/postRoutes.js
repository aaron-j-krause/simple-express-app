var express = require('express');
var router = express.Router();
var Post = require('../schema/postSchema');
var User = require('../schema/userSchema');
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/:name', function(req, res){
  User.findOne({name: req.params.name}, function(err, user){
    if (err) return err;
    Post.find({userId: user._id}, function(err, posts){
      if (err) return res.status(500).send('Could not find');
      res.send(posts);
    })
  });
})

router.post('/:name/newpost', function(req, res){
  var post = new Post({body: req.body.body});
  User.findOne({name: req.params.name}, function(err, user){
    if (err) return res.send(err);
    post.userId = user._id;
    post.save(function(err, post){
      res.send(post + ' saved.')
    });
  })
})

router.put('/:post/editpost', function(req, res){
  Post.findOneAndUpdate({_id: req.params.post}, {body: req.body.body}, function(err, post){
    if (err) return res.send(err);
    res.send('post updated');
  })
})

router.delete('/:post/deletepost', function(req, res){
  Post.findOneAndRemove({_id: req.params.post}, function(err, post){
    if (err) return res.send(err);
    res.send('post removed');
  })
})

router.get('/:post', function(req, res){
  Post.findOne({_id: req.params.post}, function(err, post){})

})


module.exports = router;