import React, { Component } from 'react'
import RecipeCard from './../../profile-feed/Recipe-card'
import RecipesService from './../../../../../service/recipes.service'


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

    handleInput = e => {

        this.setState({ search: e.target.value })

        if (this.state.search.length > 0) {
            this.recipesService
                .searchRecipe(this.state.search)
                .then(res => this.setState({ result: res.data }))
                .catch(err => console.log(err))
        } else {
            this.setState({ result: undefined })
        }

    }


    handleSubmit = e => {
        e.preventDefault()

        this.recipesService
            .searchRecipe(this.state.search)
            .then(res => this.setState({ result: res.data }))
            .catch(err => console.log(err))

        if (this.state.search.length < 1) {

        }
    }


    render() {
        return (
            <section className='recipes-list' >
                <h4>Descubre nuevas recetas: </h4>

                <Form className='search-form' onSubmit={this.handleSubmit}>
                    <FormControl type="text" placeholder="Search" className="search-bar" value={this.state.search} onChange={this.handleInput} />
                    <Button variant="outline-success" type='submit' className='shuffleButton'>Buscar</Button>
                </Form>

                {this.state.result &&
                    this.state.result.map(elm => <RecipeCard loggedUser={this.props.loggedUser} {...elm} key={elm._id} likeButton={this.props.handleFavButton} />)
                }

                <Button onClick={this.randomRecipes} className='shuffleButton'>Descubre</Button>

                { this.state.recipes ?
                    this.state.recipes.map(elm => <RecipeCard loggedUser={this.props.loggedUser} {...elm} key={elm._id} likeButton={this.props.handleFavButton} />)
                    :
                    <Spinner animation="border" variant="warning" />}
            </section>
        )
    }
}

export default Discover