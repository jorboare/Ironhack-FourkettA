import React, { Component } from 'react'
import AuthService from './../../../../service/auth.service'
import FilesService from './../../../../service/upload.service'
import './edit-profile.css'

import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap'

class EditForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: undefined
        }

        this.authService = new AuthService()
        this.filesService = new FilesService()

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
            .then(() => this.authService.findUserById(this.props.loggedUser._id)
                .then(res => {
                    this.props.setTheUser(res.data)
                    this.props.history.push(`/profile`)
                })

            )
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
                {this.state.user ?
                    <Container className='signup-container'>

                        <Row>
                            <Col md={{ span: 8, offset: 2 }}>
                                <h3>Editar imagen:</h3>
                                <hr />
                                <Form className='form' onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.File id="exampleFormControlFile1" label="Foto portada receta" name="imageUrl" onChange={this.handleImageUpload} />
                                    </Form.Group>
                                    {this.state.uploadingActive &&
                                        <Spinner animation="border" variant="warning" />
                                    }
                                    <Button variant="primary" type="submit">Aceptar</Button>
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