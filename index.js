var express = require('express');
var mongo = require('mongo');
var mongoose = require('mongoose');
var app = express();

//middleware
var morgan = require('morgan');
var bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
var userRoute = require('./lib/routes/userRoutes');
var postRoute = require('./lib/routes/postRoutes');

app.use('/user', userRoute);
app.use('/user', postRoute)

//db
mongoose.connect('mongodb://localhost/db');
var db = mongoose.connection;
db.on('error', function(err){
  console.log('error connecting');
});
db.once('connected', function(){
  console.log('connected');
});

app.get('/', function(req, res){
  res.send('fuuuck yeah');
});

app.post('/:user/newpost')
  var server = app.listen(3000, function(){
})
