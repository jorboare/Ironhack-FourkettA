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

    handleInputChange = e => this.setState({ user: { ...this.state.user, [e.target.name]: e.target.value } })

    handleSubmit = e => {

        e.preventDefault()
        this.authService
            .login(this.state.user)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.history.push(`/profile`)
            })
            .catch(err => this.setState({ errorMsg: err.response.data.message }))

    }


    render() {

        return (
            <div className='login-form-background'>
                <Container className='login-container'>

                    <Row>
                        <Col md={{ span: 6, offset: 3 }} className='login-form-col' style={{ padding: '50px' }}>
                            <h1>Iniciar sesión</h1>
                            <hr className='login-splitter' />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="username">
                                    <Form.Label>Nombre de usuario</Form.Label>
                                    <Form.Control type="text" name="username" value={this.state.user.username} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" name="password" value={this.state.user.password} onChange={this.handleInputChange} />
                                </Form.Group>
                                {this.state.errorMsg &&
                                    <div className='login-error'>
                                        <p>{this.state.errorMsg}</p>
                                    </div>
                                }

                                <Button variant="dark" type="submit">Iniciar sesión</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Login