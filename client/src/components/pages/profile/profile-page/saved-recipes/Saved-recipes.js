import React, { Component } from 'react'
import FavRecipeCard from './Fav-Recipe-card'
import RecipesService from '../../../../../service/recipes.service'


import { Spinner } from 'react-bootstrap'


class FavRecipes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            favRecipes: this.props.loggedUser.favRecipes,
            fav: this.props.fav
        }

        this.recipesService = new RecipesService()

    }

    render() {

        return (
            <section className='recipes-list' >
                <h4 className='saved-title'>Guardadas </h4>
                {this.state.fav.map(elm => <FavRecipeCard loggedUser={this.props.loggedUser} setTheUser={this.props.setTheUser} recipe={elm} key={elm._id} likeButton={this.props.handleFavButton} />)}
            </section>
        )
    }
}

export default FavRecipes