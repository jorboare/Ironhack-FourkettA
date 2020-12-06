import './App.css';
import RecipesList from './pages/recipes-list/Recipes-list'
import Header from './layout/header/header'
import { Switch, Route } from 'react-router-dom'
import Homepage from './pages/homepage/homepage'
import Profile from './pages/profile/profile'


function App() {
  return (
    <>
      <Header></Header>

      <Switch>
        <Route path='/' exact render={() => <Homepage />} />
        <Route path='/profile' exact render={() => <Profile />} />
        <Route path="/recipes" exact render={() => <RecipesList />} />
      </Switch>
    </>
  );
}

export default App;
