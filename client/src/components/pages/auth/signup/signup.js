import React, { Component } from 'react'
import AuthService from './../../../../service/auth.service'
import FilesService from './../../../../service/upload.service'
import './signup.css'

import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap'

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            user: {
                username: '',
                password: '',
                img: ''
            }
        }

        this.authService = new AuthService()
        this.filesService = new FilesService()

    }

    handleInputChange = e => this.setState({
        user:
            { ...this.state.user, [e.target.name]: e.target.value }
    })

    handleSubmit = e => {

        e.preventDefault()

        this.authService
            .signup(this.state.user)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.history.push(`/profile`)
            })
            .catch(err => this.setState({ errorMsg: err.response.data.message }))
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
                    user: { ...this.state.user, img: response.data.secure_url },
                    uploadingActive: false
                })
            })
            .catch(err => console.log('Error:', err))
    }

    render() {

        return (
            <div className='signup-form-background'>

                <Container className='signup-container'>

                    <Row>
                        <Col md={{ span: 6, offset: 3 }} className='signup-form-col' style={{ padding: '50px' }}>
                            <h1>Registro</h1>
                            <hr className='signup-splitter' />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="username">
                                    <Form.Label>Nombre de usuario</Form.Label>
                                    <Form.Control type="text" name="username" value={this.state.user.username} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" name="password" value={this.state.user.password} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.File id="exampleFormControlFile1" label="Imagen de perfil" name="imageUrl" onChange={this.handleImageUpload} />
                                </Form.Group>
                                {this.state.uploadingActive &&
                                    <Spinner animation="border" variant="warning" />
                                }
                                {this.state.errorMsg &&
                                    <div className='signup-error'>
                                        <p>{this.state.errorMsg}</p>
                                    </div>
                                }
                                <Button variant="dark" type="submit">Registrarme</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Signup