/**
 * Created by user on 13/10/2016.
 */

/*process.env.AWS_ACCESS_KEY_ID     = process.env.BUCKETEER_AWS_ACCESS_KEY_ID;
process.env.AWS_SECRET_ACCESS_KEY = process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY;
process.env.AWS_REGION            = 'us-east-1';*/

process.env.AWS_ACCESS_KEY_ID     = 'AKIAIM7JWAB2DUSDU3BA';
process.env.AWS_SECRET_ACCESS_KEY = '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';
process.env.AWS_REGION            = 'us-east-1';


var AWS = require('aws-sdk');
var s3  = new AWS.S3();

var uploader = function(){

    var uploadFile = function(params, callback){
        s3.putObject(params, function put(err, data) {
            if (err) {
                console.log(err, err.stack);
                callback(err);
            } else {
                console.log(data);
                callback(null, data);
            }
        });
    };

    var getFile = function (params, callback){
        s3.getObject(params, function put(err, data) {
            if (err) {
                console.log(err, err.stack);
                callback(err);
            }
            else{
                console.log(data);
                callback(data);
            }
        });
    };

    return{
        uploadFile:uploadFile,
        getFile:getFile

    }

};

module.exports = uploader;