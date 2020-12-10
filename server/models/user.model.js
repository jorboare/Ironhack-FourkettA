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
    img: {
        type: String,
    },
    favRecipes: {
        type: [String]
    },
    friends: {
        type: [String]
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSch)