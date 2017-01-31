/**
 * Created by wael on 29/01/2017.
 */
var Types = require('../models/schemaModels/type')
var Entities = require('../models/schemaModels/entity')
var _ =require('lodash')


var ionicController=function (req,res) {


    var getEntities= function(req,res)
    {
        Entities.find({"visible": true}, function (err, result) {
            if (err) {
                // console.log(err);
                res.status(500).send();
            }
            else {

                if (result.length == 0)
                    res.status(200).send();
                else {
                    var result2 = result.map(function (a) {
                        return {
                            '_id': a._id,
                            'introductionHead': a.introductionHead,
                            'introductionBody': a.introductionBody,
                            'introductionImage': a.introductionImage
                        };
                    });
                    // var x = _.map(result, ['introductionHead', 'introductionBody', 'introductionImage');

                    res.status(200).send(result2);
                }
            }

        })
    }

    var getEntityById=function (req,res) {
        console.log("req.query._id");
        // console.log(req);
        var id=req.params._id;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            console.log("it is not valied object id")
            res.status(500).send();
        }
        else {

            // var query = {"visible":true};
            var query = {"_id":id};
            console.log("***** query " + req.query._id);
            Entities.findOne(query, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send();
                }
                else {
                    console.log(result);
                    if (!result)
                        res.status(200).send();
                    else {
                        res.status(200).send(result);
                    }
                }

            })
        }

    }

    return {
        getEntities:getEntities,
        getEntityById:getEntityById

    }
}

module.exports=ionicController;