import axios from 'axios'

export default class RecipeService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/recipes'
        })
    }
    getRecipes = () => this.apiHandler.get('/getAllRecipes')
    getRecipeDetails = recipeId => this.apiHandler.get(`/getOneRecipe?id=${recipeId}`)
}
