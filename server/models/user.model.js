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
    favRecipes: [{
        type: [Schema.Types.ObjectId],
        ref: 'recipes'
    }],
    friends: [{
        type: [Schema.Types.ObjectId],
        ref: 'users'
    }],
    description: {
        type: String,
        default: "(Puedes editar o eliminar esta descripción desde: Cuenta - Editar Perfil)"
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSch)