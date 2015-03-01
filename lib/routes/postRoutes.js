var Post = require('../schema/postSchema');
var User = require('../schema/userSchema');
var eatAuth = require('../eatAuth');

module.exports = function(router, appSecret) {
  router.post('/:name/newpost', eatAuth(appSecret), function(req, res) {
    var post = new Post({body: req.body.body});
    User.findOne({name: req.params.name}, function(err, user) {
      if (err) return res.status(500).send('Could not find user');
      post.userId = user._id;
      post.save(function(err, post) {
        res.json(post);
      });
    });
  });

  router.put('/:post/editpost', function(req, res) {
    Post.findOneAndUpdate({_id: req.params.post}, {body: req.body.body},
      function(err, post) {
      if (err) return res.status(500).send('Could not find user');
      res.send('post updated');
    });
  });

  router.delete('/:post/deletepost', function(req, res) {
    Post.findOneAndRemove({_id: req.params.post}, function(err, post) {
      if (err) return res.status(500).send('Could not find user');
      res.send('post removed');
    });
  });

  router.get('/', function(req, res) {
    Post.find(function(err, posts) {
      if (err) return rres.status(500).send('Could not find posts');
      res.json(posts);
    });
  });
};
