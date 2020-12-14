import React, { Component } from 'react'
import AuthService from './../../../../service/auth.service'
import './signup.css'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            img: ''
        }

        this.authService = new AuthService()

    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {

        e.preventDefault()

        this.authService
            .signup(this.state)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.history.push(`/profile`)
            })
            .catch(err => console.log('HA HABIDO UN ERROR', err))
    }


    render() {

        return (

            <Container className='signup-container'>

                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>Registro</h1>
                        <hr />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label>Nombre de usuario</Form.Label>
                                <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="img">
                                <Form.Label>URL Image</Form.Label>
                                <Form.Control type="text" name="img" value={this.state.img} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Button variant="dark" type="submit">Registrarme</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Signup