import React, { Component } from 'react'
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap'
import './Edit-recipe-form.css'
import Recipes from '../../../service/recipes.service'
import { Link } from 'react-router-dom'


export default class EditRecipe extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipe: undefined
        }

        this.recipesService = new Recipes()

    }

    componentDidMount() {

        this.recipesService
            .getRecipeDetails(this.props.match.params.id)
            .then(res => {
                this.setState({ recipe: res.data })
                console.log(this.state.recipe)
            })
            .catch(err => console.log(err))
    }

    handleSubmit = e => {
        e.preventDefault()

        this.recipesService
            .editRecipe(this.props.match.params.id, this.state.recipe)
            .then(res => {
                console.log(res)
                this.props.history.push(`/detail/${this.props.match.params.id}`)


            })
            .catch(err => console.log(err))
    }
    handleInputChange = e => {

        this.setState(prevState =>
            ({
                recipe: {
                    ...prevState.recipe,
                    [e.target.name]: e.target.value
                }
            }))
    }



    render() {
        return (
            <Container >
                {this.state.recipe ?
                    <>
                        <h3 className='newRecipeTitle'>Editar receta</h3>
                        <Row className="justify-content-center">
                            <Col md={10}>
                                <Form className='form' onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="name">
                                        <Form.Label>Nombre de la receta:</Form.Label>
                                        <Form.Control type="text" placeholder="Nombre de la receta" name='name' value={this.state.recipe.name} onChange={this.handleInputChange} />
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>Url imagen:</Form.Label>
                                        <Form.Control type="text" placeholder="URL" name='img' value={this.state.recipe.img} onChange={this.handleInputChange} />
                                    </Form.Group>


                                    <Form.Group controlId="type">
                                        <Form.Label>Tipo de receta:</Form.Label>
                                        <Form.Control as="select" size="sm" name='type' custom onChange={this.handleInputChange}>
                                            <option value='normal'>Normal</option>
                                            <option value='vegetariana'>Vegetariana</option>
                                            <option value='vegana'>Vegana</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>País de origen:</Form.Label>
                                        <Form.Control type="text" placeholder="En caso de tener" name='origin' value={this.state.recipe.origin} onChange={this.handleInputChange} />
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>Raciones:</Form.Label>
                                        <Form.Control type="text" placeholder="Número de raciones" name='servings' value={this.state.recipe.servings} onChange={this.handleInputChange} />
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>Tiempo de preparación:</Form.Label>
                                        <Form.Control type="text" placeholder="En minutos" name='time' value={this.state.recipe.time} onChange={this.handleInputChange} />
                                    </Form.Group>
                                    <Form.Label>Ingredientes</Form.Label>
                                    <Row >
                                        <Col md={12}>
                                            <Form.Group controlId="ingredients">

                                                <Form.Control as="textarea" placeholder="Ingredientes" name='ingredients' key={this.state.recipe._id} className='ingredients-list' value={this.state.recipe.ingredients} onChange={this.handleInputChange} />)

                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Label>Pasos</Form.Label>
                                    <Row >
                                        <Col md={12}>
                                            <Form.Group controlId="instructions">

                                                <Form.Control as="textarea" placeholder="Paso" name='instructions' key={this.state.recipe._id} className='ingredients-list' value={this.state.recipe.instructions} onChange={this.handleInputChange} />

                                            </Form.Group>
                                        </Col>
                                    </Row>


                                    <div className='add-sub-btns'>
                                        <Button variant="primary" type="submit">Editar Receta</Button>
                                        <Link to={`/detail/${this.props.match.params.id}`}>
                                            <Button variant="primary" type="submit">Cancelar</Button>
                                        </Link>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </> :
                    <Spinner animation="border" variant="warning" />
                }
            </Container>


        )
    }
}