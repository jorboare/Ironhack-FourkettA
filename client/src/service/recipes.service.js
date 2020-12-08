import axios from 'axios'

export default class RecipeService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/recipes'
        })
    }
    getRecipes = () => this.apiHandler.get('/getAllRecipes')
    getRecipeDetails = recipeId => this.apiHandler.get(`/getOneRecipe?id=${recipeId}`)
    newRecipe = recipeData => this.apiHandler.post(`/newRecipe`, recipeData)
    deleteRecipe = recipeId => this.apiHandler.post(`/deleteRecipe/${recipeId}`)
    editRecipe = (recipeId, recipeData) => this.apiHandler.put(`/editRecipe/${recipeId}`, recipeData)
}
