import React, { Component } from 'react'
import Recipes from './../../../../service/recipes.service'
import AuthService from './../../../../service/auth.service'
import FriendCard from './friend-card/Friend-card'
import './followed-users.css'

import { Form, FormControl, Button, Container, Row, Col, Spinner } from 'react-bootstrap'




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
            .findByName(this.state.search)
            .then(res => {
                console.log(res.data.username)
                this.setState({ result: res.data })
                this.forceUpdate()
                console.log(this.state.result._id)
            })
            .catch(err => this.setState({ result: undefined }))
    }

    render() {
        return (
            <>
                <Container>
                    <section className='recipes-list'>
                        <h4>Usuarios seguidos: </h4>
                    </section>
                    <Form className='search-form' onSubmit={this.handleSubmit}>
                        <FormControl type="text" placeholder="Search" className="search-bar" value={this.state.search} onChange={this.handleInput} />
                        <Button variant="outline-success" type='submit'>Buscar</Button>
                    </Form>
                    <Row>
                        {this.state.result &&
                            <>
                                <h5>Resultado</h5>
                                <FriendCard friendId={this.state.result._id} />

                            </>
                        }
                    </Row>
                    <Row>
                        {this.state.userFriends.map(elm => <FriendCard friendId={elm} />)}
                    </Row>
                </Container>
            </>



        )
    }
}