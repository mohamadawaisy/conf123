/**
 * Created by wael on 16/11/2016.
 */
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    multipart = require('connect-multiparty')


var Types = require('./models/schemaModels/type');
var Entities = require('./models/schemaModels/entity');
var User = require('./models/schemaModels/user');
var UserToken = require('./models/userToken');

var Config = require('./config');
var db = mongoose.connect('mongodb://wael1233:uknownoth@ds151068.mlab.com:51068/kblanem');
var app = express();
var port = process.env.PORT || 7020;

var _ = require("lodash");
var cloudinary = require('cloudinary');
var fs = require('fs');

/*routes */
var manageRoutes=require('./routes/manageRoutes')
var ionicRoutes=require('./routes/ionicRoutes')



var multipartMiddleware = multipart();
//configure the app to use body parsers
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());





process.on('uncaughtException', function (err) {
    console.error(err.stack);
});


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


app.use('/api/manage', function (req, res, next) {

    if (req.header("x-access-token")) {
        var userAccessToken = new UserToken(req.header("x-access-token"), false);
        if (userAccessToken.isNotExpired()) {
            next();
        } else {
            console.log("login expired");
            res.status(401).send();

        }
    } else {
        console.log("login failed");
        res.status(401).send();
    }
});


app.use('/api/manage', manageRoutes());
app.use('/api/io', ionicRoutes());

app.post('/api/upload', multipartMiddleware, function (req, resp) {
    console.log("inside upload");
    cloudinary.config({
        cloud_name: 'dyljtjaro',
        api_key: '776846518816921',
        api_secret: 'j074P1XWuQN9o1T22CiQp86mpII'
    });
    console.log(req.body, req.files);
    var file = req.files.file;

if(file) {
    var stream = cloudinary.uploader.upload(req.files.file.path,function (result) {
        console.log(result);
        if(result.errors)
        {
            console.log("Upload Failed. Error:\n" + result.errors);
            resp.status(500).send({error: result.errors});
        }
        else
        {
            console.log("Upload Success. URL: " +  result.url);
            resp.status(200).send({url: result.url,public_id:result.public_id});
        }

    });
    // var fileName = Math.floor((Math.random() * 10000) + 1) + '-' + 'filename';//file.originalFilename;
    // var file_reader = fs.createReadStream(fileName, {encoding: 'binary'})
    //     .on('data', stream.write).on('end', stream.end);
}
else{
    resp.status(500).send({error: "file is empty"});
}
    // fs.readFile(file.path, function (err, data) {
    //     var fileName = Math.floor((Math.random() * 10000) + 1) + '-' + file.originalFilename;
    //     var params = {
    //         Key: 'public/' + fileName,
    //         Bucket: 'bucketeer-8ed2b3e1-f467-4514-a658-f058edc9329e',
    //         Body: data
    //     };
    //
    //     cloudinary.uploader.upload("my_picture.jpg", function (result) {
    //         console.log(result)
    //     })
    //     uploader().uploadFile(params, function (err, res) {
    //         if (err) {
    //             console.log("Upload Failed. Error:\n" + err);
    //             resp.status(500).send({error: err});
    //         } else {
    //             var url = 'http://bucketeer-8ed2b3e1-f467-4514-a658-f058edc9329e.s3.amazonaws.com/public/' + fileName;
    //             console.log("Upload Success. URL: " + url);
    //             resp.status(200).send({url: url});
    //         }
    //     });
    // });
});


// app.route('/api/categories')
//     .get(function (req, res) {
//
//         Types.find({}, function (err, result) {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send();
//             }
//             else {
//                 console.log(result);
//                 res.status(200).send(result);
//             }
//
//         })
//     })
//     .post(function (req, res) {
//         var t = new Types(req.body);
//         t.save(function (err, result) {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send(err);
//             }
//             else {
//                 res.status(201).send(result);
//             }
//
//         })
//
//     })
//     .put(function (req, res) {
//         console.log("put types to category")
//         var query = {"category": req.body.categories[0]};
//         var types = req.body.Types;
//
//         Types.findOne(query, function (err, type) {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send(err);
//             }
//             else {
//                 type.types = type.types.concat(types);
//                 Types.update(query, type, {upsert: true}, function (err, result) {
//                     if (err) {
//                         console.log(err);
//                         res.status(500).send(err);
//                     }
//                     else {
//                         console.log(result);
//                         res.status(200).send(result);
//                     }
//
//                 })
//             }
//         })
//
//
//     })
// app.route('/api/categories/:name')
//     .delete(function (req, res) {
//         console.log("delete category")
//         var query = {"category": req.params.name};
//         Types.remove(query, function (err, result) {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send(err);
//             }
//             else {
//                 res.status(200).send(result);
//             }
//
//         })
//
//
//     })
//     .put(function (req, res) {
//         console.log("put types to category")
//         var query = {"category": req.params.name};
//         var types = req.body.types;
//
//         Types.findOne(query, function (err, type) {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send(err);
//             }
//             else {
//                 Types.update(query, types, {upsert: true}, function (err, result) {
//                     if (err) {
//                         console.log(err);
//                         res.status(500).send(err);
//                     }
//                     else {
//                         res.status(200).send(result);
//                     }
//
//                 })
//             }
//         })
//
//
//     })
//
//
// app.route('/api/allentities')
//     .get(function (req, res) {
//         console.log("api/allentities start get")
//         Entities.find({}, function (err, result) {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send();
//             }
//             else {
//                 if (result.length == 0)
//                     res.status(200).send();
//                 else {
//                     var x = _.map(result, 'name', 'contactName', 'phone', 'fromDate', 'toDate');
//                     console.log(x);
//                     res.status(200).send(x);
//                 }
//             }
//
//         })
//     })
// app.route('/api/allentities/:_id')
//     .get(function (req, res) {
//         console.log("api/allentities/:id start get")
//         console.log("entity id is :"+req.params._id);
//         Entities.findOne({"_id": req.params._id}, function (err, result) {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send(err);
//             }
//             else {console.log(result);
//                 if (!result) res.status(500).send();
//                 else
//                 {    res.status(200).send(result);}
//             }
//
//         })
//     })
//
//
//     .post(function (req, res) {
//         var t = new Entities(req.body);
//         t.save(function (err, result) {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send(err);
//             }
//             else {
//                 res.status(201).send(result);
//             }
//
//         })
//
//     })
//
// app.route('/api/entity/:id')
//     .delete(function (req, res) {
//         console.log("delete /api/entity/:id")
//         var query = {"category": req.params.id};
//         Entity.findOne(query, function (err, entity) {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send(err);
//             }
//             else {
//                 if (!entity) {
//                     res.status(500).send();
//                 }
//                 else {
//                     entity.visible = false;
//                     Entities.update(query, entity, {upsert: true}, function (err, result) {
//                         if (err) {
//                             console.log(err);
//                             res.status(500).send(err);
//                         }
//                         else {
//                             res.status(200).send(result);
//                         }
//
//                     })
//                 }
//             }
//         })
//
//
//     })
//     .put(function (req, res) {
//         console.log("update /api/entity/:id")
//         var query = {"category": req.params.id};
//         var updated = req.body;
//         Entity.findOne(query, function (err, entity) {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send(err);
//             }
//             else {
//                 if (!entity) {
//                     res.status(500).send();
//                 }
//                 else {
//                     entity.visible = false;
//                     Entities.update(query, updated, {upsert: true}, function (err, result) {
//                         if (err) {
//                             console.log(err);
//                             res.status(500).send(err);
//                         }
//                         else {
//                             res.status(200).send(result);
//                         }
//
//                     })
//                 }
//             }
//         })
//
//
//     })
//
//
// // api's for ionic app
//
// app.route('/api/io/entities')
//     .get(function (req, res) {
//
//         // console.log("/api/io/entities start get")
//         Entities.find({"visible": true}, function (err, result) {
//             if (err) {
//                 // console.log(err);
//                 res.status(500).send();
//             }
//             else {
//
//                 if (result.length == 0)
//                     res.status(200).send();
//                 else {
//                     var result2 = result.map(function (a) {
//                         return {
//                             '_id': a._id,
//                             'introductionHead': a.introductionHead,
//                             'introductionBody': a.introductionBody,
//                             'introductionImage': a.introductionImage
//                         };
//                     });
//                     // var x = _.map(result, ['introductionHead', 'introductionBody', 'introductionImage');
//
//                     res.status(200).send(result2);
//                 }
//             }
//
//         })
//     })
//
// app.route('/api/io/entity')
//     .get(function (req, res) {
//
//         console.log("req.query._id");
//        // console.log(req);
//         var id=req.query._id;
//
//         if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//             // Yes, it's a valid ObjectId, proceed with `findById` call.
//             console.log("it is not valied object id")
//             res.status(500).send();
//         }
//         else {
//             var id= req.query._id;
//             // var query = {"visible":true};
//             var query = {"_id":id};
//             console.log("***** /api/io/entity:_id start get")
//             console.log("***** query " + req.query._id);
//             Entities.findOne(query, function (err, result) {
//                 if (err) {
//                     console.log(err);
//                     res.status(500).send();
//                 }
//                 else {
//                     console.log(result);
//                     if (!result)
//                         res.status(200).send();
//                     else {
//                         res.status(200).send(result);
//                     }
//                 }
//
//             })
//         }})


app.route('/')
    .get(function (req, res, next) {
        res.send('Shopping  Backend - Server Is alive and kicking. ');
    });


app.listen(port, function () {
    console.log('----- Shopping  Backend Server running on port: ' + port);
});
