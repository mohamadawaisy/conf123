/**
 * Created by wael on 29/01/2017.
 */

var Types = require('../models/schemaModels/type');
var Entities = require('../models/schemaModels/entity');
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
                res.status(200).send(result);
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

    var getAllEntities = function (req, res) {
        console.log("api/allentities start get")
        Entities.find({}, function (err, result) {
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
                            return {
                                _id: item._id,
                                name: item.name,
                                visible: item.visible,
                                type: item.type,
                                contactName: item.contactName,
                                phone: item.phone,
                                introductionHead: item.introductionHead
                            };
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
        getCategories: getCategories,
        postCategories: postCategories,
        putCategories: putCategories,
        deleteCategoryByName: deleteCategoryByName,
        putCategoryByName: putCategoryByName,
        getAllEntities: getAllEntities,
        getEntityById: getEntityById,
        postEntity: postEntity,
        deleteEntity: deleteEntity,
        putEntity: putEntity,
        removeImage: removeImage
    }

}

module.exports = manageController;