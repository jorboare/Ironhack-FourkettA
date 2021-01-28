import React, { Component } from 'react'
import FavRecipeCard from './Fav-Recipe-card'
import RecipesService from '../../../../../service/recipes.service'


import { Container, Row } from 'react-bootstrap'


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
                <h4 className='my-recipes-title'>Guardadas </h4>
                <Container className='feed'>
                    <Row className='recipe-card-row'>
                        {this.state.fav.map(elm => <FavRecipeCard
                            loggedUser={this.props.loggedUser}
                            setTheUser={this.props.setTheUser}
                            recipe={elm} key={elm._id}
                            likeButton={this.props.handleFavButton} />)}
                    </Row>
                </Container>
            </section>
        )
    }
}

export default FavRecipes