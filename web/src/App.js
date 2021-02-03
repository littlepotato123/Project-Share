import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import Navigation from './Components/Navigation/Navigation';
import About from './Pages/About/About';
import Auth from './Pages/Authentication/Auth';
import Categories from './Pages/Categories/Categories';
import CategoryPage from './Pages/Category Page/CategoryPage';
import Edit from './Pages/Edit/Edit';
import HomeRedirect from './Pages/Errors/HomeRedirect';
import WrongCategory from './Pages/Errors/WrongCategory';
import NotFound from './Pages/Errors/WrongPage';
import WrongUser from './Pages/Errors/WrongUser';
import Home from './Pages/Home/Home';
import Leaderboard from './Pages/Leaderboard/Leaderboard';
import NewPost from './Pages/New Post/NewPost';
import Supported from './Pages/Supporting/Supported';
import Supporting from './Pages/Supporting/Supporting';
import Trending from './Pages/Trending/Trending';
import MessagePage from './Pages/User Page/MessagePage';
import User from './Pages/User Page/User';
import Fetching from './Sample/Fetching';
import './styles/global.scss';


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
          <Route exact path="/supported/:handle">
            <Supported />
          </Route>
          <Route exact path="/supporting/:handle">
            <Supporting />
          </Route>
          <Route path="/wronguser">
            <WrongUser />
          </Route>
          <Route path="/fetch">
            <Fetching />
          </Route>
          <Route path="/newPost">
            <NewPost />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/category/:name">
            <CategoryPage />
          </Route>
          <Route path="/wrongcategory">
            <WrongCategory />
          </Route>
          <Route exact path="/messages/:id">
            <MessagePage />
          </Route>
          <Route exact path="/edit">
            <Edit />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;