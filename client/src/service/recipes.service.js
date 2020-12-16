import axios from 'axios'

export default class RecipeService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }
    getRecipes = () => this.apiHandler.get('/recipes/getAllRecipes')
    veggieRecipes = () => this.apiHandler.get('/recipes/VeggieRecipes')
    veganRecipes = () => this.apiHandler.get('/recipes/VeganRecipes')
    getUserRecipes = userId => this.apiHandler.get(`/recipes/getUserRecipes?user_Id=${userId}`)
    getFriendRecipes = userId => this.apiHandler.get(`/recipes/getFriendRecipes?user_Id=${userId}`)
    getRecipeDetails = recipeId => this.apiHandler.get(`/recipes/getOneRecipe?id=${recipeId}`)
    searchRecipe = search => this.apiHandler.get(`/recipes/searchRecipe?search=${search}`)
    newRecipe = recipeData => this.apiHandler.post(`/recipes/newRecipe`, recipeData)
    deleteRecipe = recipeId => this.apiHandler.get(`/recipes/deleteRecipe/${recipeId}`)
    editRecipe = (recipeId, recipeData) => this.apiHandler.put(`/editRecipe/${recipeId}`, recipeData)
    getRandomRecipes = () => this.apiHandler.get('/recipes/getRandomRecipes')
}