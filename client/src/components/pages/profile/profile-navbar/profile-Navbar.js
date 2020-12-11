import React, { Component } from 'react'
import { Accordion, Card, Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './profile-Navbar.css'
import AuthService from './../../../../service/auth.service'

class Navbar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            recipes: undefined,
            showModal: false,
            myRecipesSection: false
        }

        this.authService = new AuthService()
    }

    redirect = () => {
        this.props.history.push()
    }

    handleModal = visible => this.setState({ showModal: visible })

    deleteUser = () => {

        console.log(this.props)
        this.authService
            .deleteUser(this.props.loggedUser._id)
            .then(res => {
                this.props.setTheUser(undefined)
                this.props.history.push('/')
            })
            .catch(err => console.log(err))
    }



    render() {

        return (
            <>
                <section className='profile-navbar'>
                    <Accordion defaultActiveKey="1">

                        <Card>

                            <Accordion.Toggle as={Card.Header} eventKey="0">

                                Cuenta

                        </Accordion.Toggle>

                            <Accordion.Collapse eventKey="0">

                                <Card.Body><Link to='/editProfile' className=' profile-navbar-btn'>Editar imagen</Link></Card.Body>

                            </Accordion.Collapse>

                            <Accordion.Collapse eventKey="0">

                                <Card.Body ><Link to='#' onClick={() => this.handleModal(true)} className=' profile-navbar-btn delete-profile-btn'>Eliminar cuenta</Link></Card.Body>

                            </Accordion.Collapse>

                        </Card>

                    </Accordion>

                    <Accordion defaultActiveKey="1">

                        <Card>

                            <Accordion.Toggle as={Card.Header} eventKey="0">

                                Recetas

                          </Accordion.Toggle>

                            <Accordion.Collapse eventKey="0">

                                <Card.Body>

                                    <Link to='#' className='profile-navbar-btn' onClick={() => this.props.showInfo('recents')}>

                                        Recientes

                                    </Link>

                                </Card.Body>
                            </Accordion.Collapse>
                            <Accordion.Collapse eventKey="0">

                                <Card.Body>

                                    <Link to='#' className='profile-navbar-btn' onClick={() => this.props.showInfo('myRecipes')}>

                                        Mis recetas

                                    </Link>

                                </Card.Body>
                            </Accordion.Collapse>
                            <Accordion.Collapse eventKey="0">

                                <Card.Body>

                                    <Link to='#' className='profile-navbar-btn' onClick={() => this.props.showInfo('savedRecipes')}>

                                        Guardadas

                                    </Link>

                                </Card.Body>

                            </Accordion.Collapse>

                            <Accordion.Collapse eventKey="0">

                                <Card.Body>

                                    <Link to='/newRecipe' className='profile-navbar-btn newRecipe-Btn'>

                                        Añadir receta

                                </Link>

                                </Card.Body>

                            </Accordion.Collapse>

                        </Card>

                    </Accordion>

                    <Accordion defaultActiveKey="1">

                        <Card>

                            <Accordion.Toggle as={Card.Header} eventKey="0">

                                Usuarios seguidos

                        </Accordion.Toggle>

                            <Accordion.Collapse eventKey="0">

                                <Card.Body>
                                    <Link to='#' className='profile-navbar-btn' onClick={() => this.props.showInfo('followedUsers')}>

                                        Mostrar todos

                                </Link>
                                </Card.Body>

                            </Accordion.Collapse>

                        </Card>

                    </Accordion>
                </section>

                <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <h3>¿Estás seguro que quieres eliminar la cuenta?</h3>
                        <p>Si la eliminas no podrás recuperarla.</p>
                        <Button variant="dark" className='btn' onClick={() => this.handleModal(false)}>Cancelar</Button>
                        <Button variant="danger" className='btn' onClick={this.deleteUser}>Eliminar cuenta</Button>
                    </Modal.Body>
                </Modal>
            </>

        )
    }
}

export default Navbar