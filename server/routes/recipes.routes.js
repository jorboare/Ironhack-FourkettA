const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Recipe = require('../models/recipes.model')

// Endpoints

router.get('/getAllRecipes', (req, res) => {


    Recipe
        .find()
        .then(allRecipes => res.json(allRecipes))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneRecipe', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.query.id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    const recipeId = req.query.id
    Recipe
        .findById(recipeId)
        .then(recipe => res.json(recipe))
        .catch(err => res.status(500).json(err))
})

router.post('/newRecipe', (req, res) => {


    Recipe
        .create(req.body)
        .then(newRecipe => res.json(newRecipe))
        .catch(err => res.status(500).json(err))
})

router.put('/editRecipe/:recipe_id', (req, res) => {

    Recipe
        .findByIdAndUpdate(req.params.recipe_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/deleteRecipe/:recipe_id', (req, res) => {

    Recipe
        .findByIdAndDelete(req.params.recipe_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router
