import React, { Component } from 'react'
import AuthService from './../../../../service/auth.service'
import './login.css'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {
                username: '',
                password: ''
            }
        }

        this.authService = new AuthService()

    }

    handleInputChange = e => this.setState({ user: { [e.target.name]: e.target.value } })

    handleSubmit = e => {

        e.preventDefault()

        this.authService
            .login(this.state.user)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.history.push(`/profile`)
            })
            .catch(err => console.log({ err }))
    }


    render() {

        return (

            <Container className='login-container'>

                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>Iniciar sesión</h1>
                        <hr />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label>Nombre de usuario</Form.Label>
                                <Form.Control type="text" name="username" value={this.state.user.username} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.user.password} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Button variant="dark" type="submit">Iniciar sesión</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Login