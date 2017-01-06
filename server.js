/**
 * Created by wael on 16/11/2016.
 */
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    multipart = require('connect-multiparty')
var Config = require('./config');
var db = mongoose.connect('mongodb://wael1233:uknownoth@ds151068.mlab.com:51068/kblanem');
var User = require('./models/schemaModels/user');
var app = express();
var port = process.env.PORT || 7020;



//configure the app to use body parsers
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var mainRouter = require("./routes/mainRoutes");

app.use('/apidoc', express.static(__dirname + '/apidoc'));


app.use(function (req, res, next) {//__setxhr_
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'accept, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token, __setxhr_');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
app.use('/', mainRouter());
app.route('/')
    .get(function (req, res, next) {
        res.send('Shopping  Backend - Server Is alive and kicking. ');
    });


app.listen(port, function () {
    console.log('----- Shopping  Backend Server running on port: ' + port);
});
