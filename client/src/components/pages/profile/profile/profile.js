import React, { Component } from 'react'
import ProfileHeader from './../profile-header/profile-header'
import ProfileNavbar from './../profile-navbar/profile-Navbar'
import Recipes from './../../../../service/recipes.service'
import UserService from './../../../../service/auth.service'
import './profile.css'
import RecipeCard from './../profile-feed/Recipe-card'
import { Redirect } from 'react-router-dom'



import { Container, Row, Col, Spinner } from 'react-bootstrap'


export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipes: undefined,
            userProfile: undefined,
            showProfileNavbar: false,
            allRendered: false
        }

        this.recipesList = new Recipes()
        this.userService = new UserService()
    }

    componentDidMount() {

        this.recipesList
            .getRecipes()
            .then(res => this.setState({ recipes: res.data }))
            .then(() => this.userService.findByName(this.props.match.params.username))
            .then(user => this.setState({ userProfile: user.data }))
            .then(() => this.setState({ allRendered: true }))
            .then(() => {
                this.props.loggedUser.username === this.state.userProfile.username && this.setState({ showProfileNavbar: true })
                this.setState({ allRendered: true })
            })
            .catch(err => console.log(err))
    }

    handleNavbar = (command) => {
        this.setState({ showProfileNavbar: command })
    }

    handleFavButton = (recipeId) => {
        const favorites = this.props.loggedUser.favRecipes
        favorites.push(recipeId)

        console.log('RECETAS FAVORITAS USER:', favorites)

        this.userService
            .updateUser(this.props.loggedUser._id, { favRecipes: favorites })
            .then(res => this.props.setTheUser(res.data))
            .catch(err => console.log(err))

    }

    render() {
        return (
            <>
                {this.state.allRendered === true ?
                    <Container className='profile-container'>

                        <Row className="justify-content-center profile-header">
                            <ProfileHeader loggedUser={this.state.userProfile} />
                        </Row>
                        <Row className="justify-content-center">
                            {/* {this.props.loggedUser.username === this.state.userProfile.username && this.handleNavbar(true)
                            } */}

                            {this.state.showProfileNavbar === true &&
                                <Col xs={6} md={3}>
                                    <ProfileNavbar />
                                </Col>
                            }

                            <Col xs={12} md={9} >

                                {this.state.recipes ?
                                    this.state.recipes.map(elm => <RecipeCard loggedUser={this.props.loggedUser} {...elm} key={elm._id} likeButton={this.handleFavButton} />)
                                    :
                                    <Spinner animation="border" variant="warning" />}

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