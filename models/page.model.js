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
    },
    website: {
        type: Schema.Types.ObjectId,
        ref: "Website",
        required: true
    },
    productType: {
        type: Schema.Types.ObjectId,
        ref: "ProductType",
    },

}, {strict: false});


module.exports = mongoose.model('Page' , PageSchema)
