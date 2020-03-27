const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema  = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
    },
    website: {
        type: Schema.Types.ObjectId,
        ref: "website",
        required: true
    },
    function: {
        type:String,
        require: true
    }
})
//d
module.exports = mongoose.model('users' , usersSchema)
