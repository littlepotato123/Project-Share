import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Navigation from './Components/Navigation/Navigation';
import Home from './Pages/Home/Home';
import Auth from './Pages/Authentication/Auth';
import Trending from './Pages/Trending/Trending';
import Leaderboard from './Pages/Leaderboard/Leaderboard';
import User from './Pages/User Page/User';
import Categories from './Pages/Categories/Categories';
import TopPosts from './Pages/TopPosts/TopPosts'

import WrongUser from './Pages/Errors/WrongUser';
import NotFound from './Pages/Errors/WrongPage';

// Extras
import Image from './Extras/ImageUpload';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/">
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
        <Route path="/topPosts">
          <TopPosts />
        </Route>
        <Route path="/wronguser">
          <WrongUser />
        </Route>
        <Route path="/image">
          <Image />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
