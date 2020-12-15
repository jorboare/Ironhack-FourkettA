import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import RecipesService from './../../../../../service/recipes.service'
import './Fav-Recipe-card.css'

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



                                <Container >
                                    <Row className='recipe-card'>
                                        <Col md={{ span: 3, offset: 1 }} className='recipe-img-col'>
                                            <figure>
                                                <Link to={`/detail/${favRecipe._id}`}>

                                                    <Image className='recipe-img-card' src={favRecipe.img} />
                                                </Link>

                                            </figure>
                                        </Col>
                                        <Col md={6} className='recipe-card-col'>
                                            <Link to={`/detail/${favRecipe._id}`} className='recipe-card-text'>
                                                <h5 className='recipe-name'>{favRecipe.name}</h5>
                                                <p>Raciones: {favRecipe.servings} | Tiempo de preparación: {favRecipe.time} minutos</p>
                                            </Link>

                                        </Col>
                                        <Col md={1} >
                                            {!this.props.loggedUser.favRecipes.includes(favRecipe._id) ?
                                                <Button className='fav-btn-card' onClick={() => this.props.likeButton(favRecipe._id)}>💛</Button>
                                                :
                                                <Button className='fav-btn-card liked' onClick={() => this.props.likeButton(favRecipe._id)}>💔</Button>

                                            }
                                        </Col>
                                    </Row>
                                </Container>

                            </Col>

                        </Row>
                    </Container>

                }
            </>
        )
    }
}

export default RecipeCard