import React, { Component } from 'react'
import './App.css';
import RecipesList from './pages/recipes-list/Recipes-list'
import Header from './layout/header/header'
import { Switch, Route } from 'react-router-dom'
import Homepage from './pages/homepage/homepage'
import Profile from './pages/profile/profile/profile'
import Signup from './pages/signup/signup'
import Login from './pages/login/login'
import AuthServices from './../service/auth.service'
import { Redirect } from 'react-router-dom'
import NewRecipe from './pages/new-recipe/New-recipe-form'
import EditRecipe from './pages/edit-recipe/Edit-recipe-form'
import RecipeDetails from './pages/recipe-details/Recipe-details'


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
            <Route path='/profile' exact render={() => this.state.loggedInUser ? <Profile loggedUser={this.state.loggedInUser} /> : <Redirect to='/login' />} />
            <Route path="/recipes" exact render={() => <RecipesList />} />
            <Route path="/newRecipe" render={props => <NewRecipe loggedUser={this.state.loggedInUser} {...props} />} />
            <Route path="/detail/:id" render={props => <RecipeDetails {...props} />} />
            <Route path="/editRecipe/:id" render={props => <EditRecipe {...props} />} />
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
