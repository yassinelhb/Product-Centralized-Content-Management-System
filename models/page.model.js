const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PageSchema  = new Schema({
    page_name: {
        type: String,
        required: true
    },
    layout: {
        type: Schema.Types.ObjectId,
        ref: "Layout",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

}, {strict: false});


module.exports = mongoose.model('Page' , PageSchema)
