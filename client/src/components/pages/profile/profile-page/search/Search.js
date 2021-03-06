import React, { Component } from 'react'
import RecipeCard from '../../profile-feed/Recipe-card'
import RecipesService from '../../../../../service/recipes.service'
import './Search.css'

import { Button, Form, FormControl, Row, Container } from 'react-bootstrap'


class Discover extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: ""
        }

        this.recipesService = new RecipesService()

    }



    handleInput = e => this.setState({ search: e.target.value })


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
                <h4 className='search-title'>¿Qué te apetece hoy?</h4>

                <Form className='search-form' onSubmit={this.handleSubmit}>
                    <FormControl type="text" placeholder="Buscar recetas" className="search-bar" value={this.state.search} onChange={this.handleInput} />
                    <Button variant="outline-success" type='submit' className='searchButtoon'>Buscar</Button>
                </Form>

                {this.state.result &&
                    <Container >

                        <Row className='recipe-card-row'>
                            {this.state.result.map(elm => <RecipeCard loggedUser={this.props.loggedUser} {...elm} key={elm._id} likeButton={this.props.handleFavButton} />)}
                        </Row>
                    </Container>
                }

            </section>
        )
    }
}

export default Discover