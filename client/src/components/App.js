import React, { Component } from 'react'
import './App.css';
import Header from './layout/header/header'
import { Switch, Route } from 'react-router-dom'
import Homepage from './pages/homepage/homepage'
import Profile from './pages/profile/profile/profile'
import EditProfile from './pages/profile/edit-profile/edit-profile'
import UserRecipes from './pages/profile/user-recipes/user.recipes'
import Signup from './pages/auth/signup/signup'
import Login from './pages/auth/login/login'
import AuthServices from './../service/auth.service'
import { Redirect } from 'react-router-dom'
import NewRecipe from './pages/recipes/new-recipe/New-recipe-form'
import EditRecipe from './pages/recipes/edit-recipe/Edit-recipe-form'
import RecipeDetails from './pages/recipes/recipe-details/Recipe-details'


class App extends Component {

  constructor() {
    super()

    this.state = {
      loggedInUser: undefined
    }
    this.authServices = new AuthServices()
  }

  setTheUser = user => this.setState({ loggedInUser: user }, () => console.log('El nuevo estado de App es:', this.state))

  componentDidMount = () => {

    this.authServices
      .isLoggedIn()
      .then(response => this.setTheUser(response.data))
      .catch(err => this.setTheUser({ loggedInUser: undefined }))
  }

  render() {
    return (
      <>
        <Header storeUser={this.setTheUser} loggedUser={this.state.loggedInUser} />
        <main>
          <Switch>
            <Route path='/' exact render={() => <Homepage />} />
            <Route path='/profile/:username' render={props => this.state.loggedInUser ? <Profile {...props} loggedUser={this.state.loggedInUser} setTheUser={this.setTheUser} /> : <Redirect to='/login' />} />
            <Route path='/editProfile' render={props => this.state.loggedInUser ? <EditProfile {...props} loggedUser={this.state.loggedInUser} setTheUser={this.setTheUser} /> : <Redirect to='/login' />} />

            <Route path='/userRecipes' render={props => this.state.loggedInUser ? <UserRecipes {...props} loggedUser={this.state.loggedInUser} setTheUser={this.setTheUser} /> : <Redirect to='/login' />} />

            <Route path="/newRecipe" render={props => <NewRecipe loggedUser={this.state.loggedInUser} {...props} />} />
            <Route path="/detail/:id" render={props => <RecipeDetails loggedUser={this.state.loggedInUser} {...props} />} />
            <Route path="/editRecipe/:id" render={props => <EditRecipe storeUser={this.setTheUser} loggedUser={this.state.loggedInUser} {...props} />} />
            <Route path="/signup" exact render={props => <Signup storeUser={this.setTheUser} {...props} />} />
            <Route path="/login" exact render={props => <Login storeUser={this.setTheUser} {...props} />} />
          </Switch>
        </main>
      </>
    )
  }
  ;
}

export default App;
