import React, { Component } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import './New-recipe-form.css'



export default class NewRecipe extends Component {
    constructor() {
        super()

        this.state = {
            recipe: {
                name: '',
                type: '',
                ingredients: [],
                origin: '',
                instructions: [],
                servings: 0,
                updated: '',
                time: '',
                author: '',
                img: ''
            },
            numIngredients: ['+'],
            numInstructions: ['*']


        }
    }


    addIngredient = () => {
        let numberIngr = this.state.numIngredients
        numberIngr.push('+')
        this.setState({ numIngredients: numberIngr })
        console.log(this.state.numIngredients.length)
    }

    substractIngredient = () => {
        let numberIngr = this.state.numIngredients
        numberIngr.pop()
        this.setState({ numIngredients: numberIngr })
    }

    addInstructions = () => {
        let numberInst = this.state.numInstructions
        numberInst.push('+')
        this.setState({ numInstructions: numberInst })
        console.log(this.state.numInstructions.length)
    }

    substractInstructions = () => {
        let numberInst = this.state.numInstructions
        numberInst.pop()
        this.setState({ numInstructions: numberInst })

    }

    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md={10}>
                        <Form className='form'>
                            <Form.Group controlId="name">
                                <Form.Label>Nombre de la receta:</Form.Label>
                                <Form.Control type="text" placeholder="Nombre de la receta" name='name' />
                            </Form.Group>
                            <Form>
                                <Form.Group>
                                    <Form.File id="exampleFormControlFile1" label="Foto portada receta" />
                                </Form.Group>
                            </Form>
                            <Form.Group controlId="type">
                                <Form.Label>Tipo de receta:</Form.Label>
                                <Form.Control as="select" size="sm" custom>
                                    <option>Normal</option>
                                    <option>Vegetariana</option>
                                    <option>Vegana</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Label>Ingredientes</Form.Label>
                            <Row >
                                <Col md={6}>
                                    <Form.Group controlId="ingredients">

                                        {this.state.numIngredients.map((elm, idx) => <Form.Control type="text" placeholder="Ingredientes" name='ingredients' key={idx} className='ingredients-list' />)}

                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group controlId="quantity">

                                        {this.state.numIngredients.map((elm, idx) => <Form.Control type="text" placeholder="Cantidad" name='quantity' key={idx} className='ingredients-list' />)}

                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Button onClick={this.addIngredient}>+</Button>
                                    {this.state.numIngredients.length > 1 && <Button onClick={this.substractIngredient}>-</Button>}
                                </Col>
                            </Row>
                            <Form.Label>Pasos</Form.Label>
                            <Row >
                                <Col md={10}>
                                    <Form.Group controlId="ingredients">

                                        {this.state.numInstructions.map((elm, idx) => <Form.Control as="textarea" placeholder="Paso" name='ingredients' key={idx} className='ingredients-list' />)}

                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Button onClick={this.addInstructions}>+</Button>
                                    {this.state.numInstructions.length > 1 && <Button onClick={this.substractInstructions}>-</Button>}

                                </Col>
                            </Row>
                            <Form.Group controlId="name">
                                <Form.Label>Raciones:</Form.Label>
                                <Form.Control type="text" placeholder="Número de raciones" name='name' />
                            </Form.Group>
                            <Form.Group controlId="name">
                                <Form.Label>Tiempo de preparación:</Form.Label>
                                <Form.Control type="text" placeholder="En minutos" name='name' />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
  </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        )
    }
}