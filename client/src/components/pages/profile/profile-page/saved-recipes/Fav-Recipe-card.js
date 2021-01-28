
import React, { Component } from 'react'
import RecipesService from './../../../../../service/recipes.service'
import './Fav-Recipe-card.css'
import RecipeCard from './../../profile-feed/Recipe-card'

class FavRecipeCard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            favRecipe: undefined
        }

        this.recipesService = new RecipesService()
    }

    componentDidMount() {

        this.recipesService
            .getRecipeDetails(this.props.recipe)
            .then(res => this.setState({ favRecipe: [res.data] }))
            .catch(err => console.log(err))

    }

    render() {

        return (
            <>
                {this.state.favRecipe &&
                    <>
                        { this.state.favRecipe.map(elm => <RecipeCard loggedUser={this.props.loggedUser} {...elm} key={elm._id} likeButton={this.props.likeButton} />)}
                    </>
                }
            </>
        )
    }
}

export default FavRecipeCard