import React, { Component } from 'react'
import ProfileHeader from './../profile-header/profile-header'
import ProfileNavbar from './../profile-navbar/profile-Navbar'
import Recipes from './../../../../service/recipes.service'

import UserService from './../../../../service/auth.service'
import './profile.css'
import RecipeCard from './../profile-feed/Recipe-card'
import UserRecipes from './../user-recipes/user.recipes'




import { Container, Row, Col, Spinner } from 'react-bootstrap'


export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipes: undefined,
            userProfile: undefined,
            showProfileNavbar: false,
            allRendered: false,
            showUserRecipes: false
        }

        this.recipesList = new Recipes()
        this.userService = new UserService()
    }

    componentDidMount() {

        this.userService.findByName(this.props.match.params.username)
            .then(user => this.setState({ userProfile: user.data }))
            .then(() => this.recipesList.getRecipes())
            .then(res => this.setState({ recipes: res.data }))
            .then(() => this.setState({ allRendered: true }))
            .then(() => this.props.loggedUser.username === this.state.userProfile.username && this.setState({ showProfileNavbar: true }))
            .catch(err => console.log(err))
    }

    handleNavbar = (command) => {
        this.setState({ showProfileNavbar: command })
    }

    handleFavButton = (recipeId) => {
        const favorites = this.props.loggedUser.favRecipes

        this.recipesList
            .getRecipeDetails(recipeId)
            .then(recipe => favorites.push(recipe.data))
            .then(() => this.userService.updateUser(this.props.loggedUser._id, { favRecipes: favorites }))
            .catch(err => console.log(err))

    }

    showUserRecipes = () => {
        this.state.showUserRecipes ? this.setState({ showUserRecipes: false }) : this.setState({ showUserRecipes: true })
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


                            {this.state.showProfileNavbar === true &&
                                <Col xs={6} md={3}>
                                    <ProfileNavbar loggedUser={this.state.userProfile} {...this.props} showRecipes={this.showUserRecipes} />
                                </Col>
                            }

                            {!this.state.showUserRecipes ?
                                <Col xs={12} md={9} >
                                    <section className='recipes-list'>
                                        <h4>Recientes </h4>

                                        {this.state.recipes ?
                                            this.state.recipes.map(elm => <RecipeCard loggedUser={this.props.loggedUser} {...elm} key={elm._id} likeButton={this.handleFavButton} />)
                                            :
                                            <Spinner animation="border" variant="warning" />}
                                    </section>

                                </Col>
                                :
                                <Col xs={12} md={9} >
                                    <section className='recipes-list'>
                                        <h4>Mis recetas: </h4>
                                        <UserRecipes recipes={this.state.recipes} loggedUser={this.props.loggedUser} />
                                    </section>
                                </Col>}
                        </Row>
                    </Container>
                    :
                    <Spinner animation="border" variant="warning" />
                }
            </>



        )
    }
}