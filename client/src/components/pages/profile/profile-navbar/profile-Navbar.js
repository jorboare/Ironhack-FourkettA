import React, { Component } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'
import './profile-Navbar.css'

class Navbar extends Component {

    constructor() {
        super()

        this.state = {
            recipes: undefined
        }
    }

    render() {

        return (

            <ListGroup variant="flush" className='profileNav-list'>
                <Link to='/profile' className='profileNav-btn' key='1'><ListGroup.Item >Cuenta</ListGroup.Item></Link>
                <Link to='/profile' className='profileNav-btn' key='2'><ListGroup.Item>Mis recetas</ListGroup.Item></Link>
                <Link to='/profile' className='profileNav-btn' key='3'><ListGroup.Item >Amigos</ListGroup.Item></Link>
            </ListGroup>

        )
    }
}

export default Navbar