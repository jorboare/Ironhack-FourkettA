import React, { Component } from 'react'
import AuthService from './../../../../service/auth.service'
import FriendCard from './friend-card/Friend-card'
import './followed-users.css'

import { Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap'




export default class FollowedUsers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userFriends: this.props.userFriends,
            search: "",
            result: undefined
        }

        this.authService = new AuthService()
    }

    handleInput = e => this.setState({ search: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.authService
            .searchFriends(this.state.search)
            .then(res => this.setState({ result: res.data }))
            .catch(err => this.setState({ result: undefined }))
    }

    render() {
        return (
            <>
                <Container>
                    <section className='recipes-list'>
                        <h4 className='followed-users-title'>Usuarios seguidos: </h4>
                    </section>
                    <Form className='search-form' onSubmit={this.handleSubmit}>
                        <FormControl type="text" placeholder="Search" className="search-bar" value={this.state.search} onChange={this.handleInput} />
                        <Button variant="outline-success" type='submit' className='search-users-btn'>Buscar</Button>
                    </Form>
                    <Row>
                        {this.state.result &&
                            <><Col md={12}>

                                <h5 className='result-title'>Resultado</h5>
                                <hr></hr>
                            </Col>
                                {this.state.result.map(elm =>
                                    <FriendCard key={elm._id} friendId={elm._id} />
                                )}

                            </>
                        }
                    </Row>
                    <hr></hr>
                    <Row>
                        {this.state.userFriends.map((elm, idx) => <FriendCard key={idx} friendId={elm} />)}
                    </Row>
                </Container>
            </>



        )
    }
}