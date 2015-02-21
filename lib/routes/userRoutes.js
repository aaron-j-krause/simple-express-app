var express = require('express');
var router = express.Router();
var User = require('../schema/userSchema');


module.exports = function(router, passport, appSecret){
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

  router.post('/newuser', function(req, res) {
    var newUser = new User({name: req.body.name, age: req.body.age});

    newUser.basic.email = req.body.email;
    newUser.basic.password = newUser.generateHash(req.body.password)

    newUser.save(function(err, user) {
      if (err) return res.status(500).send({msg: 'could not create user'});
      res.send('new user ' + user.name + ' saved.');
    });
  });

  router.post('/login', function(req, res) {
    
    
  })

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
};
