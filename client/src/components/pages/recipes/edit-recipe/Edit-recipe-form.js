import React, { Component } from 'react'
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap'
import './Edit-recipe-form.css'
import RecipesService from '../../../../service/recipes.service'
import FilesService from '../../../../service/upload.service'
import { Link } from 'react-router-dom'


export default class EditRecipe extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipe: undefined
        }

        this.recipesService = new RecipesService()
        this.filesService = new FilesService()

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
            .editRecipe(this.state.recipe._id, this.state.recipe)
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

    handleImageUpload = e => {

        const uploadData = new FormData()
        uploadData.append('imageUrl', e.target.files[0])

        this.setState({ uploadingActive: true })

        this.filesService
            .uploadImage(uploadData)
            .then(response => {

                console.log(response.data)
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

                <Container >
                    {this.state.recipe ?
                        <>
                            <Row className="justify-content-center">
                                <Col md={10} className='new-recipe-form-col'>
                                    <h3 className='newRecipeTitle'>Editar receta</h3>
                                    <Form className='form' onSubmit={this.handleSubmit}>
                                        <Form.Group controlId="name">
                                            <Form.Label>Nombre de la receta:</Form.Label>
                                            <Form.Control type="text" placeholder="Nombre de la receta" name='name' value={this.state.recipe.name} onChange={this.handleInputChange} />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.File id="exampleFormControlFile1" className='edit-section' label="Foto portada receta" name="imageUrl" onChange={this.handleImageUpload} />
                                        </Form.Group>
                                        {this.state.uploadingActive &&
                                            <Spinner animation="border" variant="warning" />
                                        }


                                        <Form.Group controlId="type">
                                            <Form.Label className='edit-section'>Tipo de receta:</Form.Label>
                                            <Form.Control as="select" size="sm" name='type' custom onChange={this.handleInputChange}>
                                                <option value='normal'>Sin especificar</option>
                                                <option value='vegetariana'>Vegetariana</option>
                                                <option value='vegana'>Vegana</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId="visible">
                                            <Form.Label className='edit-section'>Visibilidad:</Form.Label>
                                            <Form.Control as="select" size="sm" name='visible' custom onChange={this.handleInputChange}>
                                                <option value="hide">Oculta</option>
                                                <option value="visible">Visible</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId="name">
                                            <Form.Label className='edit-section'>Raciones:</Form.Label>
                                            <Form.Control type="text" placeholder="Número de raciones" name='servings' value={this.state.recipe.servings} onChange={this.handleInputChange} />
                                        </Form.Group>

                                        <Form.Group controlId="name">
                                            <Form.Label className='edit-section'>Tiempo de preparación:</Form.Label>
                                            <Form.Control type="text" placeholder="En minutos" name='time' value={this.state.recipe.time} onChange={this.handleInputChange} />
                                        </Form.Group>

                                        <Row>
                                            <Col md={12}>
                                                <Form.Group>
                                                    <Form.File id="exampleFormControlFile1" label="Galería imágenes" name="imageUrl" onChange={this.handleGaleryUpload} />
                                                </Form.Group>
                                                {this.state.uploadingActive &&
                                                    <Spinner animation="border" variant="warning" />
                                                }
                                            </Col>
                                        </Row>

                                        <Form.Label>Ingredientes</Form.Label>
                                        <Row >
                                            <Col md={12}>
                                                <Form.Group controlId="ingredients">

                                                    <Form.Control as="textarea" rows={7} placeholder="Ingredientes" name='ingredients' className='ingredients' value={this.state.recipe.ingredients} onChange={this.handleInputChange} />

                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Form.Label>Instrucciones</Form.Label>
                                        <Row >
                                            <Col md={12}>
                                                <Form.Group controlId="instructions">

                                                    <Form.Control as="textarea" rows={7} placeholder="Instrucciones" name='instructions' className='steps' value={this.state.recipe.instructions} onChange={this.handleInputChange} />

                                                </Form.Group>
                                            </Col>
                                        </Row>


                                        <div className='edit-cancel-btns'>
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
            </div>

        )
    }
}