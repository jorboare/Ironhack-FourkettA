import React, { Component } from 'react'
import ProfileHeader from './profile-header'
import ProfileNavbar from './profile-Navbar'
import ProfileFeed from './Profile-feed'
import Recipes from '../../../service/recipes.service'
import './profile.css'


import { Container, Row, Col } from 'react-bootstrap'


export default class Profile extends Component {
    constructor() {
        super()

        this.state = {
            recipes: undefined
        }

        this.recipesList = new Recipes()
    }

    componentDidMount() {
        this.recipesList
            .getRecipes()
            .then(res => this.setState({ recipes: res.data }))
            .catch(err => console.log(err))
    }

    render() {
        return (

            <Container className='profile-container'>

                <Row className="justify-content-center profile-header">
                    <ProfileHeader />
                </Row>
                <Row className="justify-content-center">

                    <Col xs={6} md={4}>

                        <ProfileNavbar />

                    </Col>

                    <Col xs={12} md={8} >
                        {this.state.recipes ?
                            <ProfileFeed recipes={this.state.recipes} />
                            :
                            null}

                    </Col>
                </Row>
            </Container>


        )
    }
}