import React, { Component } from 'react'
import AuthService from './../../../../../service/auth.service'
import { Col, Spinner, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Friend-card.css'



class FriendCard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            friend: undefined
        }

        this.authService = new AuthService()
    }

    componentDidMount() {
        this.authService
            .findUserById(this.props.friendId)
            .then(res => this.setState({ friend: res.data }))
            .catch(err => console.log(err))

    }

    render() {

        return (

            <>
                {this.state.friend ?
                    <Col xs={6} sm={3} md={3} >
                        <div className='friend-Card'>
                            <Link to={`/user/${this.state.friend.username}`} className='friend-link'>
                                <Image src={this.state.friend.img} className='friend-img' />
                                <p>{this.state.friend.username}</p>
                            </Link>
                        </div>
                    </Col>
                    :
                    <Spinner animation="border" variant="warning" />}
            </>

        )
    }
}

export default FriendCard