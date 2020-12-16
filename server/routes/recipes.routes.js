const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Recipe = require('../models/recipes.model')
const { checkRecipeId, checkParamsRecipeId, checkUserId } = require('./middlewares')

// Endpoints

router.get('/getAllRecipes', (req, res) => {


    Recipe
        .find()
        .then(allRecipes => res.json(allRecipes))
        .catch(err => res.status(500).json(err))
})

// Get User Recipes

router.get('/getUserRecipes', checkUserId, (req, res) => {


    Recipe
        .find({ author: req.query.user_Id })
        .then(allRecipes => res.json(allRecipes))
        .catch(err => res.status(500).json(err))
})

// Get User Recipes

router.get('/getFriendRecipes', checkUserId, (req, res) => {


    Recipe
        .find({ author: req.query.user_Id, visible: 'visible' })
        .then(allRecipes => res.json(allRecipes))
        .catch(err => res.status(500).json(err))
})

// Get Favorite Recipes

router.get('/getFavRecipes', checkUserId, (req, res) => {


    Recipe
        .find({ favRecipes: req.query.user_Id })
        .then(allRecipes => res.json(allRecipes))
        .catch(err => res.status(500).json(err))
})
// 10 Random Recipes

router.get('/getRandomRecipes', (req, res) => {

    Recipe
        .find()
        .then(allRecipes => {

            for (let i = allRecipes.length - 1; i > 0; i--) { //Durstenfeld shuffle algorithm
                const j = Math.floor(Math.random() * i)
                const temp = allRecipes[i]
                allRecipes[i] = allRecipes[j]
                allRecipes[j] = temp
            }

            return res.json(allRecipes.splice(0, 3))
        })
        .catch(err => res.status(500).json(err))
})

router.get('/getOneRecipe', checkRecipeId, (req, res) => {

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

//SEARCH RECIPE

router.get('/searchRecipe', (req, res) => {

    Recipe
        .find()
        .then(result => {
            const resultFiltered = result.filter(elm => elm.name.toLowerCase().includes(req.query.search.toLowerCase()))
            res.json(resultFiltered)
        })
        .catch(err => res.status(500).json(err))

})


router.post('/newRecipe', (req, res) => {

    Recipe
        .create(req.body)
        .then(newRecipe => res.json(newRecipe))
        .catch(err => res.status(500).json(err))
})

router.put('/editRecipe/:recipe_id', checkParamsRecipeId, (req, res) => {

    Recipe
        .findByIdAndUpdate(req.params.recipe_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/deleteRecipe/:recipe_id', checkParamsRecipeId, (req, res) => {

    Recipe
        .findByIdAndDelete(req.params.recipe_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router
