import React, { Component } from 'react'
import RecipeService from './../../../../service/recipes.service'
import AuthService from './../../../../service/auth.service'
import { Link } from 'react-router-dom'
import './Recipe-details.css'
import { Container, Row, Col, Spinner, Button, Image, Modal } from 'react-bootstrap'


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
            .then(() => this.authService.findAuthor(this.state.recipe.author))
            .then(author => this.setState({ author: author.data }))
            .then(() => this.setState({ loggedUser: this.props.loggedUser }))
            .catch(err => console.log(err))

    }

    deleteRecipe = () => {
        this.recipeService
            .deleteRecipe(this.props.match.params.id)
            .then(res => {
                console.log(res)
                this.props.history.push(`/profile/${this.props.loggedUser.username}`)
            })
            .catch(err => console.log(err))



        // let num = this.props.loggedUser.ownRecipes

        // this.recipeService
        //     .deleteRecipe(this.props.match.params.id)
        //     .then(res => this.authService.updateUser(this.props.loggedUser._id, { ownRecipes: num -= 1 }))
        //     .then(user => this.props.setTheUser(user.data))
        //     .then(() => this.props.history.push(`/profile/${this.props.loggedUser.username}`))
        //     .catch(err => console.log(err))
    }

    handleModal = visible => this.setState({ showModal: visible })

    render() {
        return (
            <>
                <Container className='recipe-detail'>

                    <Row>

                        <Col md={{ span: 10, offset: 1 }}>
                            {this.state.recipe && this.state.author && this.state.loggedUser ?
                                <>
                                    <h3>{this.state.recipe.name}</h3>
                                    <div >
                                        <p >Añadida por:
                                            <Link to={`/profile/${this.state.author.username}`} className='created-by'>
                                                <Image className='recipe-author-img' src={this.state.author.img} />
                                                {this.state.author.username}
                                            </Link>
                                        </p>

                                    </div>
                                    <Image className='recipe-img-cover' src={this.state.recipe.img} />
                                    <p>Raciones: {this.state.recipe.servings}</p>
                                    <p>Tiempo de preparación: {this.state.recipe.time} minutos</p>
                                    <p>Tipo de receta: {this.state.recipe.type}</p>
                                    <p> {this.state.recipe.origin}</p>
                                    <p>Ingredientes:</p>
                                    <p>{this.state.recipe.ingredients}</p>
                                    <p>Instrucciones:</p>
                                    <p>{this.state.recipe.instructions}</p>
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
                        <Button variant="dark" className='btn' onClick={() => this.handleModal(false)}>Cancelar</Button>
                        <Button variant="danger" className='btn' onClick={this.deleteRecipe}>Eliminar receta</Button>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}
