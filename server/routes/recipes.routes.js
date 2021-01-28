const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Recipe = require('../models/recipes.model')
const { checkId, checkParamsId } = require('./middlewares')

// Endpoints

router.get('/getAllRecipes', (req, res) => {


    Recipe
        .find()
        .then(allRecipes => res.json(allRecipes))
        .catch(err => res.status(500).json(err))
})

// Get User Recipes

router.get('/getUserRecipes', checkId, (req, res) => {


    Recipe
        .find({ author: req.query.id })
        .then(allRecipes => res.json(allRecipes))
        .catch(err => res.status(500).json(err))
})

// Get User Recipes

router.get('/getFriendRecipes', checkId, (req, res) => {


    Recipe
        .find({ author: req.query.id, visible: 'visible' })
        .then(allRecipes => res.json(allRecipes))
        .catch(err => res.status(500).json(err))
})

// Get Favorite Recipes

router.get('/getFavRecipes', checkId, (req, res) => {


    Recipe
        .find({ favRecipes: req.query.id })
        .then(allRecipes => res.json(allRecipes))
        .catch(err => res.status(500).json(err))
})
// 4 Random Recipes

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

            return res.json(allRecipes.splice(0, 4))
        })
        .catch(err => res.status(500).json(err))
})

//VEGGIE RECIPES
router.get('/VeggieRecipes', (req, res) => {

    Recipe
        .find({ type: "vegetariana" }, { name: 1, type: 1 })
        .then(VeggieRecipes => res.json(VeggieRecipes))
        .catch(err => res.status(500).json(err))
})

//VEGAN RECIPES
router.get('/VeganRecipes', (req, res) => {

    Recipe
        .find({ type: "vegana" }, { name: 1, type: 1 })
        .then(VeggieRecipes => res.json(VeggieRecipes))
        .catch(err => res.status(500).json(err))
})


router.get('/getOneRecipe', checkId, (req, res) => {

    const recipeId = req.query.id
    Recipe
        .findById(recipeId)
        .then(recipe => res.json(recipe))
        .catch(err => res.status(500).json(err))
})

//SEARCH RECIPE

router.get('/searchRecipe', (req, res) => {

    Recipe
        .find({ visible: 'visible' })
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

router.put('/editRecipe/:id', checkParamsId, (req, res) => {

    Recipe
        .findByIdAndUpdate(req.params.recipe_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/deleteRecipe/:id', checkParamsId, (req, res) => {

    Recipe
        .findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router
