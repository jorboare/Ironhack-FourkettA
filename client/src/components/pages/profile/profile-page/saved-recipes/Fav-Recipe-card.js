import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import RecipesService from './../../../../../service/recipes.service'
import './Recipe-card.css'

class RecipeCard extends Component {

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
            .then(res => this.setState({ favRecipe: res.data }))
            .catch(err => console.log(err))

    }


    render() {

        const { favRecipe } = this.state
        return (
            <>

                {this.state.favRecipe &&

                    <Container className='feed'>
                        <Row className='card-content'>
                            <Col md={11}>
                                <Link to={`/detail/${favRecipe._id}`} className='recipe-link'>

                                    <Container >
                                        <Row >
                                            <Col md={3}>
                                                <figure>
                                                    <Image className='recipe-img' src={favRecipe.img} />
                                                </figure>
                                            </Col>
                                            <Col md={8} className='feed-card'>
                                                <div className='recipe-like'>
                                                    <h5 className='recipe-name'>{favRecipe.name}</h5>
                                                </div>
                                                <p>Raciones: {favRecipe.servings} | Tiempo de preparación: {favRecipe.time} minutos</p>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Link>
                            </Col>
                            {!this.props.loggedUser.favRecipes.includes(favRecipe._id) ?
                                <Button className='fav-btn' onClick={() => this.props.likeButton(favRecipe._id)}>💛</Button>
                                :
                                <Button className='fav-btn' onClick={() => this.props.likeButton(favRecipe._id)}>💔</Button>

                            }

                        </Row>
                    </Container>

                }
            </>
        )
    }
}

export default RecipeCard