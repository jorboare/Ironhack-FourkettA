import React, { Component } from 'react'
import RecipeCard from './../../profile-feed/Recipe-card'
import RecipesService from './../../../../../service/recipes.service'
import './discover.css'


import { Spinner, Button, Form, FormControl } from 'react-bootstrap'


class Discover extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipes: undefined,
            search: ""
        }

        this.recipesService = new RecipesService()

    }

    componentDidMount() {

        this.recipesService
            .getRandomRecipes()
            .then(res => this.setState({ recipes: res.data }))
            .catch(err => console.log(err))
    }

    randomRecipes = () => {

        this.recipesService
            .getRandomRecipes()
            .then(res => this.setState({ recipes: res.data }))
            .catch(err => console.log(err))

    }


    render() {
        return (
            <section className='recipes-list' >
                <div className='discover-text'>
                    <h4>Descubre</h4>
                    <p>¡Tres recetas aleatorias para que de den ideas!</p>
                    <Button onClick={this.randomRecipes} className='shuffleButton'>Descubre</Button>
                </div>

                { this.state.recipes ?
                    this.state.recipes.map(elm => <RecipeCard loggedUser={this.props.loggedUser} {...elm} key={elm._id} likeButton={this.props.handleFavButton} />)
                    :
                    <Spinner animation="border" variant="warning" />}
            </section>
        )
    }
}

export default Discover