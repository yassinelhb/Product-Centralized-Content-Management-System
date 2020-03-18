const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const WebsiteSchema = new Schema({
    domain: {
        type: String,
        required: true
    },
    logo_pic: {
        type: String,
        required: true
    },
    site_name: {
        type: String,
        required: true
    },
    theme: {
        type: Schema.Types.ObjectId,
        ref: "Theme",
        required: true
    },
    header: {
        header_name: {
            type: String,
            default: "header",
            required: true
        },
        description: {
            type: String,
            default: "header",
            required: true
        },
        links: {
            type: Array,
            default: [
                { link_text: "Home" , link_path: "/home" },
                { link_text: "Index" , link_path: "/index" },
                { link_text: "Category" , link_path: "/category" },
                { link_text: "Contact" , link_path: "/contact" },
            ]
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Website' , WebsiteSchema)
