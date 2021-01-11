import React, { Component } from 'react'
import './App.css';
import Header from './layout/header/header'
import { Switch, Route } from 'react-router-dom'
import Homepage from './pages/homepage/homepage'
import Profile from './pages/profile/profile-page/profile'
import Friend from './pages/friend-profile/profile-page/profile'
import EditProfile from './pages/profile/edit-profile/edit-profile'
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
      loggedInUser: undefined,

    }
    this.authServices = new AuthServices()
  }

  setTheUser = user => this.setState({ loggedInUser: user })

  componentDidMount = () => {

    this.authServices
      .isLoggedIn()
      .then(response => this.setState({ loggedInUser: response.data }))
      .catch(err => this.setState({ loggedInUser: null }))
  }

  render() {
    return (
      <>
        <Header storeUser={this.setTheUser} loggedUser={this.state.loggedInUser} />
        <main>
          <Switch>
            <Route path='/' exact render={() => <Homepage loggedUser={this.state.loggedInUser} />} />
            <Route path='/profile' exact render={props => this.state.loggedInUser ? <Profile {...props} loggedUser={this.state.loggedInUser} setTheUser={this.setTheUser} /> : <Redirect to='/login' />} />
            <Route path='/user/:username' render={props => this.state.loggedInUser ? <Friend {...props} loggedUser={this.state.loggedInUser} setTheUser={this.setTheUser} /> : <Redirect to='/login' />} />
            <Route path='/editProfile' render={props => this.state.loggedInUser ? <EditProfile {...props} loggedUser={this.state.loggedInUser} setTheUser={this.setTheUser} /> : <Redirect to='/login' />} />
            <Route path="/newRecipe" render={props => this.state.loggedInUser ? <NewRecipe loggedUser={this.state.loggedInUser} {...props} setTheUser={this.setTheUser} /> : <Redirect to='/login' />} />
            <Route path="/detail/:id" render={props => this.state.loggedInUser ? <RecipeDetails key={this.state.key} updateKey={this.updateKey} loggedUser={this.state.loggedInUser} {...props} setTheUser={this.setTheUser} /> : <Redirect to='/login' />} />
            <Route path="/editRecipe/:id" render={props => this.state.loggedInUser ? <EditRecipe storeUser={this.setTheUser} loggedUser={this.state.loggedInUser} {...props} /> : <Redirect to='/login' />} />
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
