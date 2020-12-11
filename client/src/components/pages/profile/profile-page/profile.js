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
            showRecipes: 'recents',
            userRecipes: undefined,
        }

        this.recipesList = new Recipes()
        this.userService = new UserService()
    }

    componentDidMount() {

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

    handleNavbar = (command) => {
        this.setState({ showProfileNavbar: command })
    }

    handleFavButton = (recipeId) => {


        const favorites = this.props.loggedUser.favRecipes

        this.recipesList
            .getRecipeDetails(recipeId)
            .then(recipe => {
                console.log(favorites)
                console.log(recipe.data)
                console.log(favorites.includes(recipe.data))
                // !favorites.includes(recipe) && favorites.push(recipe.data)
            })
            // .then(() => this.userService.updateUser(this.props.loggedUser._id, { favRecipes: favorites }))
            .catch(err => console.log(err))

    }

    showUserRecipes = action => {
        action === 'recents' && this.setState({ showRecipes: action })
        action === 'myRecipes' && this.setState({ showRecipes: action })
        action === 'savedRecipes' && this.setState({ showRecipes: action })
    }

    render() {
        return (
            <>
                {this.state.allRendered === true ?
                    <Container className='profile-container'>

                        <Row className="justify-content-center profile-header">
                            <ProfileHeader loggedUser={this.state.userProfile} numberRecipes={this.state.userRecipes.length} />
                        </Row>
                        <Row className="justify-content-center">


                            {this.state.showProfileNavbar === true &&
                                <Col xs={6} md={3}>
                                    <ProfileNavbar loggedUser={this.state.userProfile} {...this.props} showRecipes={this.showUserRecipes} />
                                </Col>
                            }

                            {this.state.showRecipes === 'recents' &&
                                <Col xs={12} md={9} >
                                    <section className='recipes-list'>
                                        <h4>Recientes </h4>

                                        {this.state.recipes ?
                                            this.state.recipes.map(elm => <RecipeCard loggedUser={this.props.loggedUser} {...elm} key={elm._id} likeButton={this.handleFavButton} />)
                                            :
                                            <Spinner animation="border" variant="warning" />}
                                    </section>

                                </Col>
                            }

                            {this.state.showRecipes === 'myRecipes' &&
                                <Col xs={12} md={9} >
                                    <section className='recipes-list'>
                                        <h4>Mis recetas: </h4>
                                        {this.state.recipes ?
                                            this.state.userRecipes.map(elm => <RecipeCard loggedUser={this.props.loggedUser} {...elm} key={elm._id} likeButton={this.handleFavButton} />)
                                            :
                                            <Spinner animation="border" variant="warning" />}

                                    </section>
                                </Col>
                            }

                            {this.state.showRecipes === 'savedRecipes' &&
                                <Col xs={12} md={9} >
                                    <section className='recipes-list'>
                                        <h4>Recetas guardadas: </h4>
                                        {this.props.loggedUser.favRecipes.map(elm => <RecipeCard loggedUser={this.props.loggedUser} {...elm} key={elm._id} likeButton={this.handleFavButton} />)}
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