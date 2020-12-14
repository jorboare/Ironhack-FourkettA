import React, { Component } from 'react'
import RecipeCard from '../../profile-feed/Recipe-card'
import RecipesService from '../../../../../service/recipes.service'


import { Spinner } from 'react-bootstrap'


class Discover extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userRecipes: undefined
        }

        this.recipesService = new RecipesService()

    }

    componentDidMount() {

        this.recipesService
            .getUserRecipes(this.props.loggedUser._id)
            .then(res => this.setState({ userRecipes: res.data }))
            .catch(err => console.log(err))
    }


    render() {
        return (
            <section className='recipes-list' >
                <h4>Mis recetas: </h4>

                { this.state.userRecipes ?
                    this.state.userRecipes.map(elm => <RecipeCard loggedUser={this.props.loggedUser} {...elm} key={elm._id} likeButton={this.handleFavButton} />)
                    :
                    <Spinner animation="border" variant="warning" />}
            </section>
        )
    }
}

export default Discover