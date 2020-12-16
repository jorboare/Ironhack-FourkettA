import axios from 'axios'

export default class RecipeService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/recipes',
            withCredentials: true
        })
    }
    getRecipes = () => this.apiHandler.get('/getAllRecipes')
    veggieRecipes = () => this.apiHandler.get('/VeggieRecipes')
    veganRecipes = () => this.apiHandler.get('/VeganRecipes')
    getUserRecipes = userId => this.apiHandler.get(`/getUserRecipes?user_Id=${userId}`)
    getFriendRecipes = userId => this.apiHandler.get(`/getFriendRecipes?user_Id=${userId}`)
    getRecipeDetails = recipeId => this.apiHandler.get(`/getOneRecipe?id=${recipeId}`)
    searchRecipe = search => this.apiHandler.get(`/searchRecipe?search=${search}`)
    newRecipe = recipeData => this.apiHandler.post(`/newRecipe`, recipeData)
    deleteRecipe = recipeId => this.apiHandler.get(`/deleteRecipe/${recipeId}`)
    editRecipe = (recipeId, recipeData) => this.apiHandler.put(`/editRecipe/${recipeId}`, recipeData)
    getRandomRecipes = () => this.apiHandler.get('/getRandomRecipes')
}