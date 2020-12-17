import React, { Component } from 'react'
import ProfileHeader from './../profile-header/profile-header'
import ProfileNavbar from './../profile-navbar/profile-Navbar'
import FollowedUsers from './../followed-users/Followed-users'
import RecipesService from './../../../../service/recipes.service'
import AuthService from './../../../../service/auth.service'
import './profile.css'
import Discover from './discover/Discover'
import Search from './search/Search'
import MyRecipes from './my-recipes/My-Recipes'
import FavRecipes from './saved-recipes/Saved-recipes'





import { Container, Row, Col, Spinner } from 'react-bootstrap'


export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipes: undefined,
            user: this.props.loggedUser,
            showProfileNavbar: false,
            allRendered: false,
            showInfo: 'myRecipes',
            userRecipes: undefined,
            key: "1"
        }

        this.recipesService = new RecipesService()
        this.authService = new AuthService()
    }

    componentDidMount() {

        this.recipesService
            .getUserRecipes(this.props.loggedUser._id) // Recibir las rutas creadas por el usuario loggeado
            .then(res => this.setState({ userRecipes: res.data })) //Añade las recetas del usuario al state
            .then(() => this.props.loggedUser.username === this.state.userProfile.username && this.setState({ showProfileNavbar: true }))
            .catch(err => console.log(err))
    }


    handleNavbar = (command) => this.setState({ showProfileNavbar: command })


    handleFavButton = (recipeId) => {

        const favorites = [...this.props.loggedUser.favRecipes]

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

            this.authService
                .deleteFavorite(this.props.loggedUser, recipeId)
                .then(res => this.authService.findUserById(this.props.loggedUser._id))
                .then(res => this.props.setTheUser(res.data))
                .then(res => this.setState({ key: this.state.key + 1 }))
                .catch(err => console.log(err))
        }

    }

    handleFollowButton = (friendId) => {

        const followedUsers = [...this.props.loggedUser.friends]

        let included = false
        followedUsers.forEach(elm => included = elm === friendId)

        if (!included) {

            this.userService
                .addFriend(this.props.loggedUser._id, friendId)
                .then(res => this.userService.findUserById(this.props.loggedUser._id))
                .then(res => { this.props.setTheUser(res.data) })
                .catch(err => console.log(err))

        } else {

            console.log(friendId)

            this.userService
                .deleteFriend(this.props.loggedUser, friendId)
                .then(res => this.userService.findUserById(this.props.loggedUser._id))
                .then(res => this.props.setTheUser(res.data))
                .catch(err => console.log(err))
        }

    }


    changeShowedInfo = action => this.setState({ showInfo: action })

    render() {
        return (
            <div className='general-background'>
                {this.state.userRecipes ?
                    <Container className='profile-container'>

                        <Row className="justify-content-center profile-header">
                            <ProfileHeader userProfile={this.props.loggedUser} numberRecipes={this.state.userRecipes.length} followButton={this.handleFollowButton} />
                        </Row>
                        <Row className="justify-content-center">



                            <Col xs={8} md={3}>
                                <ProfileNavbar loggedUser={this.state.user} {...this.props} showInfo={this.changeShowedInfo} />
                            </Col>


                            {this.state.showInfo === 'recents' &&
                                <Col xs={12} md={9} >

                                    <Discover loggedUser={this.props.loggedUser} randomRecipes={this.randomRecipes} handleFavButton={this.handleFavButton} />

                                </Col>
                            }

                            {this.state.showInfo === 'myRecipes' &&
                                <Col xs={12} md={9} >

                                    <MyRecipes loggedUser={this.props.loggedUser} handleFavButton={this.handleFavButton} />

                                </Col>
                            }

                            {this.state.showInfo === 'savedRecipes' &&
                                <Col xs={12} md={9} >

                                    <FavRecipes key={this.state.key} loggedUser={this.props.loggedUser} fav={this.props.loggedUser.favRecipes} setTheUser={this.props.setTheUser} handleFavButton={this.handleFavButton} />

                                </Col>}

                            {this.state.showInfo === 'followedUsers' &&
                                <Col xs={12} md={9} >

                                    <FollowedUsers loggedUser={this.props.loggedUser} userFriends={this.props.loggedUser.friends} />

                                </Col>}

                            {this.state.showInfo === 'search' &&
                                <Col xs={12} md={9} >

                                    <Search loggedUser={this.props.loggedUser} handleFavButton={this.handleFavButton} />

                                </Col>}
                        </Row>

                    </Container>
                    :
                    <Spinner animation="border" variant="warning" />
                }
            </div>



        )
    }
}