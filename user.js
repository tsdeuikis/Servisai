"use strict";

var express = require('express');
var bodyParser= require('body-parser');
var bcrypt = require('bcrypt');
var app = express();
var User = require("./model/usermodel.js");
var db = require("./model/db.js");
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({"extended":true}));
app.use(bodyParser.json());

/*app.get('/register', function (req, res) {
   res.redirect("/register.html");
});*/

app.post('/register', function(req, res){
  /*bcrypt.hash(req.body.password, 10, function(err, hash){
    var hashedPwd = hash;
    return hashedPwd;
  });*/
  var hashedPwd = bcrypt.hashSync(req.body.password, 10);
  var regUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPwd,
    role: req.body.userStatus
  });
  regUser.save(function(err){
      if(err){
        console.log(err);
        res.send("Vartotojas/El.Paštas jau naudojamas");
      }
      else {
      console.log('success');
    }
  });
});

app.listen(3002);
