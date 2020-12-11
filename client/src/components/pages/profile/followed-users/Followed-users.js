import React, { Component } from 'react'
import Recipes from './../../../../service/recipes.service'
import UserService from './../../../../service/auth.service'
import './followed-users.css'

import { Form, FormControl, Button } from 'react-bootstrap'


export default class FollowedUsers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userProfile: undefined,
            allRendered: false,


        }

        this.recipesList = new Recipes()
        this.userService = new UserService()
    }

    componentDidMount() {



        // this.userService.findByName(this.props.match.params.username)
        //     .then(user => this.setState({ userProfile: user.data })) //Datos del usuario del perfil (diferentes a los del usuario registrado)
        //     .then(() => this.recipesList.getRecipes())
        //     .then(res => this.setState({ recipes: res.data })) //Todas las recetas
        //     .then(res => this.state.recipes.filter(elm => elm.author === this.props.loggedUser._id))
        //     .then(res => this.setState({ userRecipes: res })) //Añade las recetas del usuario al state
        //     .then(() => this.setState({ allRendered: true })) //Condición para que se rendericen las vistas
        //     .then(() => this.props.loggedUser.username === this.state.userProfile.username && this.setState({ showProfileNavbar: true }))
        //     .catch(err => console.log(err))
    }


    render() {
        return (
            <>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </>



        )
    }
}