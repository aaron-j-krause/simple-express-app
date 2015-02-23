process.env.MONGO_URI = 'mongodb://localhost/test_db'
require('../server');

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var mongoose = require('mongoose');
var User = require('../lib/schema/userSchema')
chai.use(chaihttp);

describe('User API', function(){
  var token;
  var userId;
  before(function(done) {
    chai.request('localhost:3000')
      .post('/user/newuser')
      .send('{"name":"testguy", "password":"password", "email":"email@example.com"}')
      .end(function(err, res){
        token = res.token;
        done()
      })
  })
  after(function(done) {
    //mongoose.connection.db.dropDatabase(function(){
      done();
    //})
  })

  it('should create a new user', function(done){
    chai.request('localhost:3000')
      .post('/user/newuser')
      .send('{"name": "testguytwo", "password": "password", "email":"anotheremail@example.com"}')
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.token).to.not.be.undefined;
        done();
      })
  })
  it('should GET a list of users', function(done) {
    chai.request('localhost:3000')
      .get('/user/')
      .end(function(err, res) {
        console.log(res.body, typeof res.body)
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.empty;
        done();
      })
  })
})