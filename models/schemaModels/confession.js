/**
 * Created by wael on 17/01/2017.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var confession = new Schema({


    "confessionTxt": {
        type: String,
        description: "",
        default: ""
    },
    "latitude": {
        type: Number,
        description: "", default: 0
    },
    "longitude": {
        type: Number,
        description: "", default: 0
    },
    "radius": {
        type: Number,
        description: "", default: 100
    },
    "reports": {
        type: Number,
        description: "", default: 0
    },

})
module.exports = mongoose.model('confession', confession);

