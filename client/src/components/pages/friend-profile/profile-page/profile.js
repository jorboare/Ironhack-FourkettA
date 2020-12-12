import React, { Component } from 'react'
import ProfileHeader from './../profile-header/profile-header'
import ProfileNavbar from './../profile-navbar/profile-Navbar'
import Recipes from './../../../../service/recipes.service'
import UserService from './../../../../service/auth.service'
import './profile.css'
import RecipeCard from './../profile-feed/Recipe-card'





import { Container, Row, Col, Spinner } from 'react-bootstrap'


export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipes: undefined,
            userProfile: undefined,
            showProfileNavbar: false,
            allRendered: false,
            showInfo: 'recents',
            userRecipes: undefined,
        }

        this.recipesList = new Recipes()
        this.userService = new UserService()
    }

    componentDidMount() {

        this.props.location.pathname === `/user/${this.props.loggedUser.username}` && this.props.history.push('/profile')

        this.userService.findByName(this.props.match.params.username)
            .then(user => this.setState({ userProfile: user.data })) //Datos del usuario del perfil (diferentes a los del usuario registrado)
            .then(() => this.recipesList.getRecipes())
            .then(res => this.setState({ recipes: res.data })) //Todas las recetas
            .then(res => this.state.recipes.filter(elm => elm.author === this.props.loggedUser._id))
            .then(res => this.setState({ userRecipes: res })) //Añade las recetas del usuario al state
            .then(() => this.setState({ allRendered: true })) //Condición para que se rendericen las vistas
            .then(() => this.props.loggedUser.username === this.state.userProfile.username && this.setState({ showProfileNavbar: true }))
            .catch(err => console.log(err))
    }

    handleNavbar = (command) => this.setState({ showProfileNavbar: command })


    handleFavButton = (recipeId) => {


        const favorites = this.props.loggedUser.favRecipes

        let included = false

        favorites.forEach(elm => included = elm._id === recipeId)

        if (!included) {
            this.recipesList
                .getRecipeDetails(recipeId)
                .then(recipe => favorites.push(recipe.data))
                .then(() => this.userService.updateUser(this.props.loggedUser._id, { favRecipes: favorites }))
                .catch(err => console.log(err))
        }

    }

    //WORK IN PROGRESS
    handleFollowButton = (userId) => {

        const followedUsers = [...this.props.loggedUser.friends]

        let included = false
        followedUsers.forEach(elm => included = elm === userId)

        if (!included) {
            this.userService
                .addFriend(this.props.loggedUser._id, userId)
                .then(res => this.userService.findUserById(this.props.loggedUser._id))
                .then(res => { this.props.setTheUser(res.data) })
                .catch(err => console.log(err))
        }

    }

    changeShowedInfo = action => this.setState({ showInfo: action })

    render() {
        return (
            <>
                {this.state.userRecipes ?
                    <Container className='profile-container'>

                        <Row className="justify-content-center profile-header">
                            <ProfileHeader userProfile={this.state.userProfile} numberRecipes={this.state.userRecipes.length} followButton={this.handleFollowButton} />
                        </Row>
                        <Row className="justify-content-center">
                            <Col md={12}>
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