const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['vegetariana', 'vegana', 'normal'],
        default: 'normal'
    },
    ingredients: {
        type: String,
        required: true,
        default: 'ingredientes'
    },
    origin: {
        type: String
    },
    instructions: {
        type: String,
        required: true,
        default: 'instrucciones'
    },
    servings: {
        type: String
    },
    updated: {
        type: Date,
        default: Date.now
    },
    time: {
        type: Number
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    img: {
        type: String
    },
    visible: {
        type: String,
        enum: ["visible", "hide"],
        default: "hide"
    }

},
    {
        timestamps: true
    })

const Recipes = mongoose.model('Recipe', recipeSchema)

module.exports = Recipes



// ingredients: [{
//     food: {
//         type: String,
//         required: true
//     },
//     quantity: {
//         type: String
//     }
// }]