const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PageSchema  = new Schema({
    page_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Page' , PageSchema)
