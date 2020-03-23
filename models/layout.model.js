const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LayoutSchema  = new Schema({
    layout_name: {
        type: String,
        required: true
    },
    layout_img: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Layout' , LayoutSchema)
