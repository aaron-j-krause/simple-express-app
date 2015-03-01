var express = require('express');
var mongo = require('mongo');
var mongoose = require('mongoose');
var app = express();
var passport = require('passport');

var assignUserRoutes = require('./lib/routes/userRoutes');
var assignPostRoutes = require('./lib/routes/postRoutes');
var assignPassportStrat = require('./lib/passport_strat');

//middleware
var morgan = require('morgan');
var bodyParser = require('body-parser');

//passport
app.set('appSecret', process.env.SECRET || 'chaaaaaange');
app.use(passport.initialize());
assignPassportStrat(passport);

app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
var userRouter = express.Router();
var postRouter = express.Router();

assignPostRoutes(postRouter, app.get('appSecret'));
assignUserRoutes(userRouter, passport, app.get('appSecret'));

app.use('/user', userRouter);
app.use('/posts', postRouter);

//db
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/dev_db');

var server = app.listen((process.env.PORT || 3000), function(port) {
  console.log('listening on ' + (process.env.PORT || 3000));
});
