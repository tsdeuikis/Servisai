"use strict";

var soap = require("soap");
var http = require("http");
var xml = require("fs").readFileSync("authentication.wsdl", "utf8");
var express = require("express");
var User = require("./model/usermodel.js");
var db = require("./model/db.js");
var mongoose = require('mongoose');
var app = express();

var usersData = [
                  {email: "t1@mail.com", password: "t1"},
                  {email: "t2mail.com", password: "t2"},
                  {email: "t3@mail.com", password: "t3"}
                ];

var service = {
    AuthenticationService : {
        loginPort : {
              authenticate : function(args){
                for (var i = 0; i<=usersData.length; i++){
                  if (usersData[i]["email"] == args["email"] && usersData[i]["password"] == args["password"])
                  {
                    return{
                      loginRequestResponse : true,
                      username : args.email
                    }
                  }
                }
              }
            }
          }
        };


var server = http.createServer(function(request, response){
  response.end("404: Not Found: " + request.url);
});


server.listen(3001);
server.listen(server, '/login', service, xml);
