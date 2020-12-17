import React, { Component } from 'react'
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap'
import './New-recipe-form.css'
import RecipesService from './../../../../service/recipes.service'
import FilesService from './../../../../service/upload.service'


export default class NewRecipe extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipe: {
                name: '',
                type: 'normal',
                ingredients: '',
                origin: '',
                instructionsImgs: [],
                servings: '',
                updated: '',
                time: '',
                author: this.props.loggedUser ? this.props.loggedUser._id : ''
            },

        }
        this.recipesService = new RecipesService()
        this.filesService = new FilesService()

    }

    handleSubmit = e => {
        e.preventDefault()

        this.recipesService
            .newRecipe(this.state.recipe)
            .then(res => this.props.history.push(`/profile`))
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

    handleImageUpload = e => {

        const uploadData = new FormData()
        uploadData.append('imageUrl', e.target.files[0])

        this.setState({ uploadingActive: true, img: '' })

        this.filesService
            .uploadImage(uploadData)
            .then(response => {

                this.setState({
                    recipe: { ...this.state.recipe, img: response.data.secure_url },
                    uploadingActive: false
                })
            })
            .catch(err => console.log('Error:', err))
    }

    handleGaleryUpload = e => {

        const uploadData = new FormData()
        uploadData.append('imageUrl', e.target.files[0])

        this.setState({ uploadingActive: true })

        this.filesService
            .uploadImage(uploadData)
            .then(response => {

                const instructionsImgsCopy = [...this.state.recipe.instructionsImgs]
                instructionsImgsCopy.push(response.data.secure_url)


                this.setState({
                    recipe: { ...this.state.recipe, instructionsImgs: instructionsImgsCopy },
                    uploadingActive: false
                })
            })
            .catch(err => console.log('Error:', err))
    }


    render() {
        return (

            <div className='edit-recipe-form'>

                <Container>
                    <Row className="justify-content-center">
                        <Col md={10} className='new-recipe-form-col'>
                            <h3 className='newRecipeTitle'>Nueva receta</h3>
                            <Form className='form' onSubmit={this.handleSubmit}>
                                <Form.Group controlId="name">
                                    <Form.Label>Nombre de la receta:</Form.Label>
                                    <Form.Control type="text" placeholder="Nombre de la receta" name='name' value={this.state.recipe.name} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.File id="exampleFormControlFile1" label="Foto portada receta" name="imageUrl" onChange={this.handleImageUpload} />
                                </Form.Group>
                                {this.state.uploadingActive &&
                                    <Spinner animation="border" variant="warning" />
                                }

                                <Form.Group controlId="type">
                                    <Form.Label>Tipo de receta:</Form.Label>
                                    <Form.Control as="select" size="sm" name='type' custom onChange={this.handleInputChange}>
                                        <option value='normal'>Sin especificar</option>
                                        <option value='vegetariana'>Vegetariana</option>
                                        <option value='vegana'>Vegana</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="visible">
                                    <Form.Label>Visibilidad:</Form.Label>
                                    <Form.Control as="select" size="sm" name='visible' custom onChange={this.handleInputChange}>
                                        <option value="hide" selected>Oculta</option>
                                        <option value="visible">Visible</option>
                                    </Form.Control>
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

                                            <Form.Control as="textarea" rows={7} placeholder="Ingredientes" name='ingredients' className='ingredients-list' value={this.state.recipe.ingredients} onChange={this.handleInputChange} />

                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Label>Instrucciones</Form.Label>
                                <Row >
                                    <Col md={12}>
                                        <Form.Group controlId="instructions">

                                            <Form.Control as="textarea" rows={7} placeholder="Instrucciones" name='instructions' className='ingredients-list' value={this.state.recipe.instructions} onChange={this.handleInputChange} />

                                        </Form.Group>
                                    </Col>

                                    <Form.Group>
                                        <Form.File id="exampleFormControlFile1" label="Galería imágenes" name="imageUrl" onChange={this.handleGaleryUpload} />
                                    </Form.Group>
                                    {this.state.uploadingActive &&
                                        <Spinner animation="border" variant="warning" />
                                    }
                                </Row>


                                <div className='edit-cancel-btns'>
                                    <Button variant="primary" type="submit">Añadir receta</Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}