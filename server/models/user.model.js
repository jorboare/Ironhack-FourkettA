const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSch = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    img: {
        type: String,

    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSch)