import React, { Component } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import './New-recipe-form.css'
import Recipes from './../../../../service/recipes.service'


export default class NewRecipe extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipe: {
                name: '',
                type: 'normal',
                ingredients: '',
                origin: '',
                instructions: '',
                servings: '',
                updated: '',
                time: '',
                author: this.props.loggedUser ? this.props.loggedUser._id : '',
                img: ''
            },
            numIngredients: ['+'],
            numInstructions: ['+']


        }
        console.log(this.props)
        this.recipesList = new Recipes()

    }

    add = (stateProp) => {

        if (stateProp === 'numIngredients') {
            this.state.numIngredients.push('+')
            this.setState({ numIngredients: this.state.numIngredients })
        } else if (stateProp === 'numInstructions') {
            this.state.numInstructions.push('+')
            this.setState({ numInstructions: this.state.numInstructions })
        }
    }
    substract = (stateProp) => {

        if (stateProp === 'numIngredients') {
            this.state.numIngredients.pop()
            this.setState({ numIngredients: this.state.numIngredients })
        } else if (stateProp === 'numInstructions') {
            this.state.numInstructions.pop()
            this.setState({ numInstructions: this.state.numInstructions })
        }
    }

    handleSubmit = e => {
        e.preventDefault()

        this.recipesList
            .newRecipe(this.state.recipe)
            .then(res => {
                console.log(res)
                this.props.history.push(`/profile/${this.props.loggedUser.username}`)


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
            <Container>
                <h3 className='newRecipeTitle'>Nueva receta</h3>
                <Row className="justify-content-center">
                    <Col md={10}>
                        <Form className='form' onSubmit={this.handleSubmit}>
                            <Form.Group controlId="name">
                                <Form.Label>Nombre de la receta:</Form.Label>
                                <Form.Control type="text" placeholder="Nombre de la receta" name='name' value={this.state.recipe.name} onChange={this.handleInputChange} />
                            </Form.Group>

                            {/* <Form.Group>
                                <Form.File id="exampleFormControlFile1" label="Foto portada receta" name="img" />
                            </Form.Group> */}
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
                                <Form.Control type="text" placeholder="Rellenar en caso de tener una nacionalidad concreta" name='origin' value={this.state.recipe.origin} onChange={this.handleInputChange} />
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

                                        {this.state.numIngredients.map((elm, idx) => <Form.Control as="textarea" placeholder="Ingredientes" name='ingredients' key={idx} className='ingredients-list' value={this.state.recipe.ingredients} onChange={this.handleInputChange} />)}

                                    </Form.Group>
                                </Col>
                                {/* <Col md={4}>
                                    <Form.Group controlId="quantity">

                                        {this.state.numIngredients.map((elm, idx) => <Form.Control type="text" placeholder="Cantidad" name='quantity' key={idx} className='ingredients-list' value={this.state.recipe.servings} onChange={this.handleInputChange} />)}

                                    </Form.Group>
                                </Col> */}
                                <Col md={12} className='add-sub-btns'>
                                    <Button onClick={() => this.add('numIngredients')} className='form-btn'>+</Button>
                                    {this.state.numIngredients.length > 1 && <Button onClick={() => this.substract('numIngredients')}>-</Button>}
                                </Col>
                            </Row>
                            <Form.Label>Pasos</Form.Label>
                            <Row >
                                <Col md={12}>
                                    <Form.Group controlId="instructions">

                                        {this.state.numInstructions.map((elm, idx) => <Form.Control as="textarea" placeholder="Paso" name='instructions' key={idx} className='ingredients-list' value={this.state.recipe.instructions} onChange={this.handleInputChange} />)}

                                    </Form.Group>
                                </Col>
                                <Col md={12} className='add-sub-btns'>
                                    <Button onClick={() => this.add('numInstructions')} className='form-btn'>+</Button>
                                    {this.state.numInstructions.length > 1 && <Button onClick={() => this.substract('numInstructions')}>-</Button>}
                                </Col>
                            </Row>


                            <div className='add-sub-btns'>
                                <Button variant="primary" type="submit">Submit</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>

        )
    }
}