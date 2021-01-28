import axios from 'axios'

export default class RecipeService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'https://fourketta-api.herokuapp.com/api',
            withCredentials: true
        })
    }
    getRecipes = () => this.apiHandler.get('/recipes/getAllRecipes')
    veggieRecipes = () => this.apiHandler.get('/recipes/VeggieRecipes')
    veganRecipes = () => this.apiHandler.get('/recipes/VeganRecipes')
    getUserRecipes = userId => this.apiHandler.get(`/recipes/getUserRecipes?id=${userId}`)
    getFriendRecipes = userId => this.apiHandler.get(`/recipes/getFriendRecipes?id=${userId}`)
    getRecipeDetails = recipeId => this.apiHandler.get(`/recipes/getOneRecipe?id=${recipeId}`)
    searchRecipe = search => this.apiHandler.get(`/recipes/searchRecipe?search=${search}`)
    newRecipe = recipeData => this.apiHandler.post(`/recipes/newRecipe`, recipeData)
    deleteRecipe = recipeId => this.apiHandler.get(`/recipes/deleteRecipe/${recipeId}`)
    editRecipe = (recipeId, recipeData) => this.apiHandler.put(`/recipes/editRecipe/${recipeId}`, recipeData)
    getRandomRecipes = () => this.apiHandler.get('/recipes/getRandomRecipes')
}