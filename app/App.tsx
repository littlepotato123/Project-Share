import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Navigation from './components/Navigation';
import About from './pages/About';
import Auth from './pages/Auth';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import Edit from './pages/Edit';
import Error from './pages/Error';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import NewPost from './pages/NewPost';
import Supported from './pages/Supported';
import Supporting from './pages/Supporting';
import Trending from './pages/Trending';
import User from './pages/User';
import WrongCategory from './pages/WrongCategory';
import WrongUser from './pages/WrongUser';
import { Pages } from './Tools';

const App: React.FC = () => {
  const [page, setPage] = useState<Pages>(Pages.HOME);
  const [display, setDisplay] = useState(<Home />);

  useEffect(() => {
    switch(page) {
      case Pages.HOME:
        setDisplay(<Home />);
        break;
      case Pages.AUTH:
        setDisplay(<Auth />);
        break;
      case Pages.ABOUT:
        setDisplay(<About />);
        break;
      case Pages.CATEGORIES:
        setDisplay(<Categories />);
        break;
      case Pages.CATEGORY_PAGE:
        setDisplay(<CategoryPage />);
        break;
      case Pages.EDIT:
        setDisplay(<Edit />);
        break;
      case Pages.LEADERBOARD:
        setDisplay(<Leaderboard />);
        break;
      case Pages.NEWPOST:
        setDisplay(<NewPost />);
        break;
      case Pages.SUPPORTED:
        setDisplay(<Supported />);
        break;
      case Pages.SUPPORTING:
        setDisplay(<Supporting />);
        break;
      case Pages.TRENDING:
        setDisplay(<Trending />);
        break;
      case Pages.USER:
        setDisplay(<User />);
        break;
      case Pages.WRONG_CATEGORY:
        setDisplay(<WrongCategory />);
        break;
      case Pages.WRONG_USER:
        setDisplay(<WrongUser />);
        break;
      default:
        setDisplay(<Error />);
    }
  }, [page])
  
  return (
    <View>
      <Navigation
        page={page} 
        setPage={setPage}
      />
      {
        display
      }
    </View>
  );
}

export default App;