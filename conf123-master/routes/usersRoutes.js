var express = require('express');
var routes= function(){

var UserRouter = express.Router();
var userController= require("../controllers/userController");

    UserRouter.route('/')
 .post(userController.post);



}

module.exports = routes;
