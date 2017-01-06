/**
 * Created by wael on 08/10/2016.
 */

var SHA256 = require("sha256");
var KblanemStaff = require('../models/schemaModels/user');

var spr = '_!!_';
var validation = function () {
    
    var validateUserHash = function (username, password, time, hashed, callback) {
        time= new Date();
        var strToHash = (username + spr + time );
        var currentKey = SHA256(strToHash + spr + password);
        if (currentKey !== hashed) {
            callback("");
            return;
        }
        var query = {"username": username};
        KblanemStaff.findOne(query, function (err, user) {
            if (err) {
                console.log(err);
                callback("");
            }
            else {
                    if (user) {
                        if (user.saltedpassword == password) {
                            callback("KblanemStaff");
                        }
                    }
                    else{
                        callback("");
                    }



            }

        });

    };


    return {
        validateUserHash: validateUserHash

    }

}

module.exports = validation;
