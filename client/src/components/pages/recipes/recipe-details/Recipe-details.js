import React, { Component } from 'react'
import RecipeService from './../../../../service/recipes.service'
import AuthService from './../../../../service/auth.service'
import { Link } from 'react-router-dom'
import './Recipe-details.css'
import { Container, Row, Col, Spinner, Button, Image, Modal } from 'react-bootstrap'
import Raciones from './images/user.png'
import Tiempo from './images/stopwatch.png'
import Hoja from './images/leaf.png'


export default class Detail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            recipe: undefined,
            author: undefined,
            showModal: false,
            loggedUser: undefined
        }
        this.recipeService = new RecipeService()
        this.authService = new AuthService()
    }

    componentDidMount = () => {

        this.recipeService
            .getRecipeDetails(this.props.match.params.id)
            .then(res => this.setState({ recipe: res.data }))
            .then(() => this.authService.findUserById(this.state.recipe.author))
            .then(author => this.setState({ author: author.data, loggedUser: this.props.loggedUser }))
            .catch(err => console.log(err))

    }

    deleteRecipe = () => {
        this.recipeService
            .deleteRecipe(this.props.match.params.id)
            .then(res => {
                console.log(res)
                this.props.history.push(`/profile`)
            })
            .catch(err => console.log(err))

    }

    handleModal = visible => this.setState({ showModal: visible })

    render() {
        return (
            <div className='recipe-detail'>
                <Container>

                    <Row>

                        <Col md={{ span: 10, offset: 1 }} className='recipe-detail-col'>
                            {this.state.recipe && this.state.author && this.state.loggedUser ?
                                <>
                                    <div className='title-info'>
                                        <h3>{this.state.recipe.name}</h3>
                                        <p >Añadida por:
                                            <Link to={`/user/${this.state.author.username}`} className='created-by'>
                                                <Image className='recipe-author-img' src={this.state.author.img} />
                                                {this.state.author.username}
                                            </Link>
                                        </p>
                                    </div>

                                    <div className='recipe-characteristics'>

                                        <p><Image className='recipe-icon' src={Raciones} />
                                            {this.state.recipe.servings}</p>

                                        <p><Image className='recipe-icon' src={Tiempo} /> {this.state.recipe.time}'</p>
                                        {this.state.recipe.type === 'vegetariana' || this.state.recipe.type === 'vegana' ?
                                            <p><Image className='recipe-icon' src={Hoja} />{this.state.recipe.type}</p>
                                            :
                                            null
                                        }
                                    </div>
                                    <Image className='recipe-img-cover' src={this.state.recipe.img} />
                                    <div className='ingredients'>
                                        <h4>Ingredientes</h4>
                                        <hr></hr>
                                        <p className='textarea'>{this.state.recipe.ingredients}</p>
                                    </div>
                                    <div className='gallery'>
                                        <h4>Galería de Imágenes</h4>
                                        <hr></hr>
                                        {this.state.recipe.instructionsImgs.length > 0 ?
                                            <>
                                                {this.state.recipe.instructionsImgs.map(elm => <Image className='recipe-img-gallery' src={elm} style={{ 'width': '50px;' }} />)}
                                            </>
                                            :
                                            <p>No hay imágenes disponibles</p>
                                        }
                                    </div>
                                    <div className='steps'>
                                        <h4>Instrucciones</h4>
                                        <hr></hr>
                                        <p className='textarea'>{this.state.recipe.instructions}</p>
                                    </div>
                                    {this.state.author._id === this.state.loggedUser._id &&
                                        <>
                                            <Button variant="dark" className='btn' onClick={() => this.handleModal(true)}>Eliminar receta</Button>
                                            <Link to={`/editRecipe/${this.state.recipe._id}`}>
                                                <Button variant="dark" className='btn'>Editar receta</Button>
                                            </Link>
                                        </>
                                    }
                                </>
                                :
                                <Spinner animation="border" variant="warning" />
                            }
                        </Col>

                    </Row>


                </Container>

                <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <h3>¿Estás seguro que quieres eliminar la receta?</h3>
                        <p>Si la eliminas no podrás recuperarla.</p>
                        <Button variant="dark" className='recipe-details-btn' onClick={() => this.handleModal(false)}>Cancelar</Button>
                        <Button variant="danger" className='recipe-details-btn' onClick={this.deleteRecipe}>Eliminar receta</Button>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
