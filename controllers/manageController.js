/**
 * Created by wael on 29/01/2017.
 */

var Types = require('../models/schemaModels/type');
var Confessions = require('../models/schemaModels/confession');
var _ = require('lodash');
var underscore = require('underscore');
var cloudinary = require('cloudinary');

var manageController = function () {

    var getCategories = function (req, res) {
        Types.find({}, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send();
            }
            else {
                console.log(result);
                res.status(200).send({"data":result});
            }

        })

    }

    var postConfession = function (req, res) {
        var t = new Confessions(req.body);
        t.save(function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                res.status(201).send(result);
            }

        })
    }

    var putConfession = function (req, res) {
        console.log("put types to confessions")
        var query = {"Confessions": req.body.confessionTxt};
        var types = req.body.Types;

        Types.findOne(query, function (err, type) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                type.types = type.types.concat(types);
                Types.update(query, type, {upsert: true}, function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                    }
                    else {
                        console.log(result);
                        res.status(200).send(result);
                    }

                })
            }
        })
    }

    var postCategories = function (req, res) {
        var t = new Types(req.body);
        t.save(function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                res.status(201).send(result);
            }

        })
    }

    var putCategories = function (req, res) {
        console.log("put types to category")
        var query = {"category": req.body.categories[0]};
        var types = req.body.Types;

        Types.findOne(query, function (err, type) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                type.types = type.types.concat(types);
                Types.update(query, type, {upsert: true}, function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                    }
                    else {
                        console.log(result);
                        res.status(200).send(result);
                    }

                })
            }
        })
    }


    var deleteCategoryByName = function (req, res) {
        console.log("delete category")
        var query = {"category": req.params.name};
        Types.remove(query, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                res.status(200).send(result);
            }

        })
    }

    var putCategoryByName = function (req, res) {

        console.log("put types to category")
        if (req.body.categories.length == 0)
            res.status(500).send();
        else {
            var query = {"category": req.body.categories[0]};
            var  previousTypes = req.body.Types;

            Types.findOne(query, function (err, type) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                }
                else {

                    var merged=previousTypes.concat(type.types)
                    var types = {"types":merged};
                    Types.update(query, types, {upsert: true}, function (err, result) {
                        if (err) {
                            console.log(err);
                            res.status(500).send(err);
                        }
                        else {
                            res.status(200).send(result);
                        }
                    })
                }
            })
        }
    }
    function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
        var R = 6378.137; // Radius of earth in KM
        var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d * 1000; // meters
    }


    var getAllConfessions = function (req, res) {
        console.log("api/allentities start get")
        Confessions.find({} , function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send();
            }
            else {
                if (result.length == 0)
                    res.status(200).send();
                else {
                    var results = underscore.map(
                        underscore.where(result, {}),
                        function (item) {
                            var distance = measure(req.body.latitude,req.body.longitude,item.latitude,item.longitude);
                            // var distance = Math.sqrt(Math.pow(req.body.longitude - item.longitude,2) +  Math.pow(req.body.latitude - item.latitude,2));
                            // var radius = item.radius;
                            if(distance<=100)
                            {
                                return {
                                    _id: item._id,
                                    confessionTxt: item.confessionTxt,
                                };
                            }

                        }
                    );
                    console.log(results);
                    res.status(200).send({'data': results});
                }
            }

        })

    }

    var getEntityById = function (req, res) {
        console.log("api/allentities/:id start get")
        console.log("entity id is :" + req.params._id);
        Entities.findOne({"_id": req.params._id}, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                console.log(result);
                if (!result) res.status(500).send();
                else {
                    res.status(200).send(result);
                }
            }

        })
    }

    var postEntity = function (req, res) {
        var t = new Entities(req.body);
        t.save(function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                res.status(201).send(result);
            }

        })
    }

    var deleteEntity = function (req, res) {
        console.log("delete /api/entity/:id")
        var query = {"category": req.params.id};
        Entity.findOne(query, function (err, entity) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                if (!entity) {
                    res.status(500).send();
                }
                else {
                    entity.visible = false;
                    Entities.update(query, entity, {upsert: true}, function (err, result) {
                        if (err) {
                            console.log(err);
                            res.status(500).send(err);
                        }
                        else {
                            res.status(200).send(result);
                        }

                    })
                }
            }
        })
    }

    var putEntity = function (req, res) {
        console.log("update /api/entity/:id")
        var query = {"_id": req.params._id};
        var updated = req.body;
        Entities.findOne(query, function (err, entity) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                if (!entity) {
                    res.status(500).send();
                }
                else {
                    entity.visible = false;
                    Entities.update(query, updated, {upsert: true}, function (err, result) {
                        if (err) {
                            console.log(err);
                            res.status(500).send(err);
                        }
                        else {
                            res.status(200).send(result);
                        }

                    })
                }
            }
        })

    }

    var removeImage = function (req, res) {
        var public_id = req.body.public_id;
        cloudinary.config({
            cloud_name: 'dyljtjaro',
            api_key: '776846518816921',
            api_secret: 'j074P1XWuQN9o1T22CiQp86mpII'
        });
        cloudinary.uploader.destroy(public_id
            , function (result) {
                if (result.errors) {
                    console.log("deletion Failed. Error:\n" + result.errors);
                    res.status(500).send({error: result.errors});
                }
                else {
                    console.log("deletion Success. URL: " + public_id);
                    res.status(200).send({url: public_id});
                }
            });
    }

    var login = function (req, res) {


    }
    return {
      //  getCategories: getCategories,
     //   postCategories: postCategories,
        postConfession: postConfession,
        putConfession: putConfession,
     //   deleteCategoryByName: deleteCategoryByName,
     //   putCategoryByName: putCategoryByName,
        getAllConfessions: getAllConfessions,
      //  getEntityById: getEntityById,
      //  postEntity: postEntity,
       // deleteEntity: deleteEntity,
       // putEntity: putEntity,
       // removeImage: removeImage
    }

}

module.exports = manageController;