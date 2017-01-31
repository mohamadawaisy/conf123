/**
 * Created by wael on 17/01/2017.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var type = new Schema({

    "category": {
        type: String,
        description: "",
        default: ""
    },
    "types": []
})
module.exports = mongoose.model('type', type);

