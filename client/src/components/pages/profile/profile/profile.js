import React, { Component } from 'react'
import ProfileHeader from './../profile-header/profile-header'
import ProfileNavbar from './../profile-navbar/profile-Navbar'
import Recipes from './../../../../service/recipes.service'
import './profile.css'
import RecipeCard from './../profile-feed/Recipe-card'
import { Redirect } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'


import { Container, Row, Col } from 'react-bootstrap'


export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipes: undefined,

        }

        this.recipesList = new Recipes()
    }

    componentDidMount() {
        this.recipesList
            .getRecipes()
            .then(res => {
                this.setState({ recipes: res.data })
                console.log(this.state.recipes)
            })
            .catch(err => console.log(err))


    }

    render() {
        return (

            this.props.loggedUser ?
                (<Container className='profile-container'>

                    <Row className="justify-content-center profile-header">
                        <ProfileHeader loggedUser={this.props.loggedUser} />
                    </Row>
                    <Row className="justify-content-center">

                        <Col xs={6} md={3}>

                            <ProfileNavbar />

                        </Col>

                        <Col xs={12} md={9} >

                            {this.state.recipes ?
                                this.state.recipes.map(elm => <RecipeCard recipes={elm} key={elm._id} />)
                                :
                                <Spinner animation="border" variant="warning" />}

                        </Col>
                    </Row>
                </Container>)
                :
                <Redirect to='/' />



        )
    }
}