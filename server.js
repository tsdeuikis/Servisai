//"use strict";

var express = require('express');
var app = express();
var soap = require('soap');
var url = "http://localhost:3001/login?wsdl";
var regurl = "http://localhost:3002/register";
var bodyParser = require("body-parser");
var fs = require("fs");
var session = require('express-session');
var User = require("./model/usermodel.js");
var db = require("./model/db.js");
var request = require('request');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//app.use(session({secret: 'ssee'}));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({"extended":true}));

app.get('/', function (req, res) {
  res.redirect("/login.html");
});

app.get('/login', function (req, res) {
   res.redirect("/login.html");
});

app.post('/login', function (req, res) {
  soap.createClient(url, function(error, client){
    if(error){
      throw error;
    }
    else{
    var LoginData = {
      email : req.body.username,
      password : req.body.password
    }
    client.describe().AuthenticationService.loginPort;
    client.authenticate(LoginData, function(error2, res2){
      if (error){
         throw error;
       }
      if (res2["loginRequestResponse"] == true || res2["loginRequestResponse"] == "true"){
        //req.session.logged = true;
        res.redirect("/main.html");
      }
      else {
        res.send("Nesinervuok dar paeis");
      }
    });
  }
})
});

app.get('/logout', function(req, res){
  req.session.destroy(function(err){
    if(err){
      console.log(err);
    }
    else{
      res.redirect('/');
    }
  });
});

app.get('/register', function (req, res) {
   res.redirect("register.html");
   //res.sendFile("/views/register.html");
});

app.post('/register', function (req, res) {
  var options = {
  url: regurl,
  regData: {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmPwd: req.body.confirmPwd,
      role: req.body.userStatus
    }
  };

  function callback(error, response, body){
    console.log('forma: ', options.regData);
    if (!error && response.statusCode == 200) {
    console.log('success');
    res.redirect('/login');
  }
  else{
    console.log('error: ', error);
  }
};
  request.post(options, callback);
});

app.listen(3000);
