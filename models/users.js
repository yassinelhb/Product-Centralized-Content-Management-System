const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema  = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    country: {
        type: String,
        require: true
    },
    site: {
        type: String,
        require: true
    },
    function: {
        type:String,
        require: true
    }
})

module.exports = mongoose.model('users' , usersSchema)
