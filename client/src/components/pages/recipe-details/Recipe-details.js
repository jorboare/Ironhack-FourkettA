import React, { Component } from 'react'
import RecipeService from './../../../service/recipes.service'
import { Link } from 'react-router-dom'
import './Recipe-details.css'
import { Container, Row, Col, Spinner, Card, Button } from 'react-bootstrap'


export default class Detail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            recipe: undefined
        }
        this.recipeService = new RecipeService()
    }

    componentDidMount = () => {
        console.log(this.props.match.params.id)

        this.recipeService
            .getRecipeDetails(this.props.match.params.id)
            .then(res => {
                this.setState({ recipe: res.data })
                console.log(this.state.recipe)
            })
            .catch(err => console.log(err))

    }

    deleteArtist = () => {
        this.recipeService
            .deleteRecipe(this.props.match.params.id)
            .then(res => {
                console.log(res)
                this.props.history.push('/profile')
            })
            .catch(err => console.log(err))
    }

    render() {
        return (

            <Container className='recipe-detail'>

                <Row>

                    <Col md={{ span: 10, offset: 1 }}>
                        {this.state.recipe ?

                            <Card style={{ width: '100%' }}>
                                {this.state.recipe.img && <Card.Img variant="top" src={this.state.recipe.img} />}
                                <Card.Body>
                                    <Card.Title>{this.state.recipe.name}</Card.Title>
                                    <Card.Text>Raciones: {this.state.recipe.servings}
                                    </Card.Text>
                                    <Card.Text>Tiempo de preparación: {this.state.recipe.time} minutos
                                    </Card.Text>
                                    <Card.Text>
                                        {this.state.recipe.origin}
                                    </Card.Text>
                                    <Card.Text>
                                        {this.state.recipe.ingredients}
                                    </Card.Text>
                                    <Card.Text>
                                        {this.state.recipe.instructions}
                                    </Card.Text>
                                    <Button variant="dark" className='btn' onClick={this.deleteArtist}>Eliminar receta</Button>
                                    <Link to={`/editRecipe/${this.state.recipe._id}`}>
                                        <Button variant="dark" className='btn'>Editar receta</Button>
                                    </Link>
                                </Card.Body>
                            </Card> :

                            <Spinner animation="border" variant="warning" />
                        }
                    </Col>

                </Row>


            </Container>

        )
    }
}
