import React from 'react';
import {
  BrowserRouter as Router,

  Route, Switch
} from 'react-router-dom';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Auth from './Pages/Authentication/Auth';
import Categories from './Pages/Categories/Categories';
import CategoryPage from './Pages/Category Page/CategoryPage';
import HomeRedirect from './Pages/Errors/HomeRedirect';
import TooManyRequests from './Pages/Errors/TooManyRequests';
import NotFound from './Pages/Errors/WrongPage';
import WrongUser from './Pages/Errors/WrongUser';
import Home from './Pages/Home/Home';
import Leaderboard from './Pages/Leaderboard/Leaderboard';
import NewPost from './Pages/New Post/NewPost';
import Trending from './Pages/Trending/Trending';
import User from './Pages/User Page/User';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <HomeRedirect />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/auth">
          <Auth />
        </Route>
        <Route exact path="/trending">
          <Trending />
        </Route>
        <Route exact path="/leaderboard">
          <Leaderboard />
        </Route>
        <Route path="/user/:userHandle">
          <User />
        </Route>
        <Route path="/categories">
          <Categories />
        </Route>
        <Route path="/wronguser">
          <WrongUser />
        </Route>
        <Route path="/newPost">
          <NewPost />
        </Route>
        <Route path="/category/:name">
          <CategoryPage />
        </Route>
        <Route path="/toomanyrequests">
          <TooManyRequests />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
