const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BlogSchema  = new Schema({
    Title: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    website: {
        type: Schema.Types.ObjectId,
        ref: "website",
    },
    Statut: {
        type: String,
    }
})

module.exports = mongoose.model('Blog' , BlogSchema)
