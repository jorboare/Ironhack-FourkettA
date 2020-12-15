import React, { Component } from 'react'
import { Accordion, Card, Modal, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './profile-Navbar.css'
import AuthService from './../../../../service/auth.service'
import FilesService from './../../../../service/upload.service'

class Navbar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            recipes: undefined,
            showEditModal: false,
            showDeleteModal: false,
            myRecipesSection: false,
            user: this.props.loggedUser
        }

        this.authService = new AuthService()
        this.filesService = new FilesService()

    }

    redirect = () => {
        this.props.history.push()
    }

    handleEditModal = visible => this.setState({ showEditModal: visible })
    handleDeleteModal = visible => this.setState({ showDeleteModal: visible })

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

    handleSubmit = e => {

        e.preventDefault()

        this.authService
            .updateUser(this.props.loggedUser._id, this.state.user)
            .then(() => this.authService.findUserById(this.props.loggedUser._id))
            .then(res => {
                this.handleEditModal(false)
                this.props.setTheUser(res.data)
            })


            .catch(err => console.log('HA HABIDO UN ERROR', err))
    }

    handleImageUpload = e => {

        const uploadData = new FormData()
        uploadData.append('imageUrl', e.target.files[0])
        console.log('ESTO ES UNA IMAGEN EN MEMORIA:', e.target.files[0])


        this.setState({ uploadingActive: true })

        this.filesService
            .uploadImage(uploadData)
            .then(response => {

                console.log(response.data)
                this.setState({
                    user: { ...this.state.user, img: response.data.secure_url },
                    uploadingActive: false
                })
            })
            .catch(err => console.log('ERRORRR!', err))
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

                                <Card.Body><Link to='#' className='profile-navbar-btn' onClick={() => this.handleEditModal(true)}>Editar imagen</Link></Card.Body>

                            </Accordion.Collapse>

                            <Accordion.Collapse eventKey="0">

                                <Card.Body ><Link to='#' onClick={() => this.handleDeleteModal(true)} className=' profile-navbar-btn delete-profile-btn'>Eliminar cuenta</Link></Card.Body>

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

                                    <Link to='#' className='profile-navbar-btn' onClick={() => this.props.showInfo('recents')}>

                                        Descubre

                                    </Link>

                                </Card.Body>
                            </Accordion.Collapse>
                            <Accordion.Collapse eventKey="0">

                                <Card.Body>

                                    <Link to='#' className='profile-navbar-btn' onClick={() => this.props.showInfo('search')}>

                                        Búsqueda

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

                <Modal className="editModal" show={this.state.showEditModal} onHide={() => this.handleEditModal(false)}>
                    <Modal.Body className="editModalBody">
                        <h3>Editar imagen:</h3>
                        <hr />
                        <Form className='form' onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.File id="exampleFormControlFile1" label="Foto portada receta" name="imageUrl" onChange={this.handleImageUpload} />
                            </Form.Group>
                            <Button variant="primary" type="submit">Aceptar</Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showDeleteModal} onHide={() => this.handleDeleteModal(false)}>
                    <Modal.Body>
                        <h3>¿Estás seguro que quieres eliminar la cuenta?</h3>
                        <p>Si la eliminas no podrás recuperarla.</p>
                        <Button variant="dark" className='btn' onClick={() => this.handleDeleteModal(false)}>Cancelar</Button>
                        <Button variant="danger" className='btn' onClick={this.deleteUser}>Eliminar cuenta</Button>
                    </Modal.Body>
                </Modal>
            </>

        )
    }
}

export default Navbar