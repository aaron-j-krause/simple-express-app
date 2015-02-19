var express = require('express');
var router = express.Router();
var User = require('../schema/userSchema');

router.get('/:name', function(req, res) {
  User.find({name: req.params.name}, function(err, user) {
    if (err) return console.log(err);
    res.send(user);
  });
});

router.get('/', function(req, res) {
  var list = [];
  User.find(function(err, users) {
    if (err) return console.log(err);
    for (var i in users) {
      list.push(users[i].name);
    }
    res.send(list);
  });
});

router.post('/', function(req, res) {
  var newUser = new User({name: req.body.name, age: req.body.age, posts: []});

  newUser.save(function(err, user) {
    if (err) return res.send(err);
    res.send('new user ' + user.name + ' saved.');
  });
});

router.patch('/:name', function(req, res) {
  User.findOneAndUpdate({name: req.params.name}, req.body, function(err, user) {
    if (err) return res.send(err);
    console.log(user.posts);
    res.send('user ' + user.name + ' updated.');
  });
});

router.delete('/:name', function(req, res) {
  User.findOneAndRemove({name: req.params.name}, function(err, user) {
    if (err) return res.send(err);
    res.send('user ' + user.name + ' deleted');
  });
});

module.exports = router;
