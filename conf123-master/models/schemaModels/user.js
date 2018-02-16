/**
 * Created by wael on 01/01/2017.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userModel = new Schema({

    "username": {type: String},
    "password": {type: String},
    "lang": {type: String},
    "rtl": {type: Boolean},
    "description": {type: String},
    "email": {type: String},
    "phonenumber": {type: String}
})
module.exports = mongoose.model('user', userModel);