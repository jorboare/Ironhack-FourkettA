import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import RecipesService from './../../../../../service/recipes.service'
import './Fav-Recipe-card.css'
import EmptyHeart from './images/heart.png'
import FullHeart from './images/heart (1).png'
import Servings from './images/user.png'
import Time from './images/stopwatch.png'
import Leaf from './images/leaf.png'

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
                                        <Col md={6} className='fav-recipe-card-col'>
                                            <div className='fav-recipe-border-line'>
                                                <Link to={`/detail/${favRecipe._id}`} className='recipe-card-text'>
                                                    <h5 className='recipe-name'>{favRecipe.name}</h5>
                                                    <div className='recipe-information'>
                                                        <p>
                                                            <Image className='servings-img' src={Servings} />
                                                            {favRecipe.servings}
                                                        </p>
                                                        <p>
                                                            <Image className='time-img' src={Time} />
                                                            {favRecipe.time}'
                                </p>

                                                        {favRecipe.type === 'vegetariana' && <p><Image className='time-img' src={Leaf} /> vegetariana</p>}
                                                        {favRecipe.type === 'vegana' && <p><Image className='time-img' src={Leaf} /> vegana</p>}
                                                    </div>
                                                </Link>
                                            </div>
                                        </Col>
                                        <Col md={1} >
                                            {!this.props.loggedUser.favRecipes.includes(favRecipe._id) ?
                                                <Button className='fav-btn-card' onClick={() => this.props.likeButton(favRecipe._id)}>
                                                    <span className='unliked-btn'><Image className='emptyHeart' src={EmptyHeart} /></span>
                                                    <span className='likeHeart'><Image className='fullHeart' src={FullHeart} /></span>


                                                </Button>
                                                :
                                                <Button className='fav-btn-card liked' onClick={() => this.props.likeButton(favRecipe._id)}>
                                                    <span className='likedHeart'><Image className='fullHeart' src={FullHeart} /></span>
                                                    <span className='unlike-btn'><Image className='emptyHeart' src={EmptyHeart} /></span>

                                                </Button>
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