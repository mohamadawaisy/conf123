/**
 * Created by wael on 01/01/2017.
 */
var express = require('express');
var UserToken = require('../models/userToken');
var User = require('../models/schemaModels/user');
var SHA256 = require('../utils/sha256');
var routes = function () {
        var mainRouter = express.Router();

        mainRouter.route('/api/user/login')
    .get(function (req, res, next) {
        res.send({"message":"User login support post method only"});
    })
    .post(function (req, res, next) {
        console.log("user login started");
        var user = req.body.username;
        var password = req.body.password;
        if(user)
            user=user.toLowerCase();
        if(password)
            password=password.toLowerCase();
        var query = {"username": user, "password": password};
        User.findOne(query, function (err, users) {
            if (err) {
                res.sendStatus(401);
            }
            else {
             if (users._doc.role == "superAdmin") {
                    CurrentUserToken = new UserToken(true,"", user, password, users.role, "");
                 var result = {
                     token: CurrentUserToken.getToken(),
                     lang: users.lang,
                     rtl: users.rtl,
                 };
                 res.send(result);
                }
                else {
                 res.status(401).send();
                }

            }
        });
    });

return mainRouter;
}
;
module.exports = routes;