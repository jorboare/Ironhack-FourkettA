import React, { Component } from 'react'
import AuthService from './../../../../service/auth.service'
import './edit-profile.css'

import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap'

class EditForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: undefined
        }

        this.authService = new AuthService()

    }

    componentDidMount() {
        this.setState({ user: this.props.loggedUser })
    }

    handleInputChange = e => {
        console.log(this.state.user)
        this.setState(prevState =>
            ({
                user: {
                    ...prevState.user,
                    [e.target.name]: e.target.value
                }
            }))
    }
    handleSubmit = e => {

        e.preventDefault()

        this.authService
            .updateUser(this.props.loggedUser._id, this.state.user)
            .then(theLoggedInUser => {
                this.props.setTheUser(theLoggedInUser.data)
                this.props.history.push(`/profile/${this.state.user.username}`)        // redirección JS
            })
            .catch(err => console.log('HA HABIDO UN ERROR', err))
    }


    render() {

        return (
            <>
                {this.state.user ?
                    <Container className='signup-container'>

                        <Row>
                            <Col md={{ span: 8, offset: 2 }}>
                                <h3>Editar imagen:</h3>
                                <hr />
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="password">
                                        <Form.Label>URL imagen</Form.Label>
                                        <Form.Control type="text" name="img" value={this.state.user.img} onChange={this.handleInputChange} />
                                    </Form.Group>


                                    <Button variant="dark" type="submit">Registrarme</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                    :
                    <Spinner animation="border" variant="warning" />
                }
            </>
        )
    }
}

export default EditForm