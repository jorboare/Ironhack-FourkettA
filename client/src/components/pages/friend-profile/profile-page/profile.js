import React, { Component } from 'react'
import ProfileHeader from './../profile-header/profile-header'

import RecipesService from './../../../../service/recipes.service'
import UserService from './../../../../service/auth.service'
import './profile.css'
import RecipeCard from './../../profile/profile-feed/Recipe-card'


import { Container, Row, Col, Spinner } from 'react-bootstrap'


export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipes: undefined,
            userProfile: undefined,
            showInfo: 'recents',
            user: this.props.loggedUser
        }

        this.recipesService = new RecipesService()
        this.authService = new UserService()
    }

    componentDidMount() {

        this.props.location.pathname === `/user/${this.props.loggedUser.username}` && this.props.history.push('/profile')

        this.authService.findByName(this.props.match.params.username)
            .then(user => this.setState({ userProfile: user.data })) //Datos del usuario del perfil (diferentes a los del usuario registrado)
            .then(() => this.recipesService.getFriendRecipes(this.state.userProfile._id))
            .then(res => this.setState({ recipes: res.data })) //Todas las recetas
            .then(() => this.props.loggedUser.username === this.state.userProfile.username && this.setState({ showProfileNavbar: true }))
            .catch(err => console.log(err))
    }

    handleNavbar = (command) => this.setState({ showProfileNavbar: command })


    handleFavButton = (recipeId) => {


        const favorites = [...this.props.loggedUser.favRecipes]

        console.log(favorites)

        let included = false

        favorites.forEach(elm => included = elm === recipeId)

        console.log(included)

        if (!included) {
            this.authService
                .addFavorite(this.props.loggedUser._id, recipeId)
                .then(recipe => this.authService.findUserById(this.props.loggedUser._id))
                .then(res => this.props.setTheUser(res.data))
                .catch(err => console.log(err))
        } else {

            console.log(recipeId)

            this.authService
                .deleteFavorite(this.props.loggedUser, recipeId)
                .then(res => this.authService.findUserById(this.props.loggedUser._id))
                .then(res => this.props.setTheUser(res.data))
                .catch(err => console.log(err))
        }

    }


    handleFollowButton = (friendId) => {

        const followedUsers = [...this.props.loggedUser.friends]

        let included = false
        followedUsers.forEach(elm => included = elm === friendId)

        if (!included) {

            this.authService
                .addFriend(this.props.loggedUser._id, friendId)
                .then(res => this.authService.findUserById(this.props.loggedUser._id))
                .then(res => { this.props.setTheUser(res.data) })
                .catch(err => console.log(err))

        } else {

            console.log(friendId)

            this.authService
                .deleteFriend(this.props.loggedUser, friendId)
                .then(res => this.authService.findUserById(this.props.loggedUser._id))
                .then(res => this.props.setTheUser(res.data))
                .catch(err => console.log(err))
        }

    }

    changeShowedInfo = action => this.setState({ showInfo: action })

    render() {
        return (
            <div className='general-background'>
                {this.state.recipes ?
                    <Container className='profile-container'>

                        <Row className="justify-content-center profile-header">
                            <ProfileHeader userProfile={this.state.userProfile} loggedUser={this.props.loggedUser} numberRecipes={this.state.recipes.length} followButton={this.handleFollowButton} />
                        </Row>
                        <Row className="justify-content-center">
                            <Col md={12}>
                                <h4 className='friend-profile-title'>Recetas de {this.state.userProfile.username}</h4>
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
            </div>



        )
    }
}