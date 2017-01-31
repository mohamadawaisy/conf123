/**
 * Created by wael on 17/01/2017.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var entity = new Schema({

    "category": {
        type: String,
        description: "",
        default: ""
    },
    "type": {
        type: String,
        description: "",
        default: ""
    },
    "name": {
        type: String,
        description: "",
        default: ""
    },
    "contactName": {
        type: String,
        description: "",
        default: ""
    },
    "introductionImage": {
        type: String,
        description: "",
        default: ""
    },
    "introductionHead": {
        type: String,
        description: "",
        default: ""
    },
    "introductionBody": {
        type: String,
        description: "",
        default: ""
    },
    "headline": {
        type: String,
        description: "",
        default: ""
    },
    "body": {
        type: String,
        description: "",
        default: ""
    },
    "phone": {
        type: String,
        description: "",
        default: ""
    },
    "phone2": {
        type: String,
        description: "",
        default: ""
    },
    "fax": {
        type: String,
        description: "",
        default: ""
    },
    "email": {
        type: String,
        description: "",
        default: ""
    },
    "activationDate": {
        type: Date,
        description: "activation Date", default: ""
    },
    "address": {
        type: String,
        description: "",
        default: ""
    },
    "dateCreated": {
        type: Date,
        description: "", default: ""
    },
    "fromDate": {
        type: Date,
        description: "", default: ""
    },
    "toDate": {
        type: Date,
        description: "", default: ""
    },
    "headlineImages":[{"image":{type:String},"text1":{type:String},"text2":{type:String}}],
        // {
        //         type: String,
        //         description: "",
        //         default: ""
        //     },
    // "images": [{type: JSON}],

    "headlineSmallImages": {
        type: String,
        description: "",
        default: ""
    },
    // "smallImages": [{type: JSON}],
    "headlineMoreImages": {
        type: String,
        description: "",
        default: ""
    },
    // "moreImages": [{type: JSON}],
    "city": {
        type: String,
        description: "", default: ""
    },
    "visible": {type: Boolean, default: false},
    "mapLink": {
        type: String,
        description: "", default: ""
    },
    "latitude": {
        type: Number,
        description: "", default: 0
    },
    "gratitude": {
        type: Number,
        description: "", default: 0
    },
    // "workingHoursPerDay": [{
    //     type: JSON
    // }]
})
module.exports = mongoose.model('entity', entity);

