const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['vegetarian', 'vegan', 'regular'],
        default: 'regular'
    },
    ingredients: [{
        food: {
            type: String,
            required: true
        },
        quantity: {
            type: String
        },
        measure: {
            type: String,
            enum: ['gr', 'kg', 'ml', 'l', 'cds']
        }

    }],
    origin: {
        type: String
    },
    instructions: {
        type: [String],
        required: true
    },
    servings: {
        type: Number
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
        type: 'string'
    }

},
    {
        timestamps: true
    })

const Recipes = mongoose.model('Recipe', recipeSchema)

module.exports = Recipes