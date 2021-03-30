import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Navigation from './components/Navigation';
import About from './pages/About';
import Auth from './pages/Auth/Auth';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import Edit from './pages/Edit';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import NewPost from './pages/NewPost';
import Supported from './pages/Supported';
import Supporting from './pages/Supporting';
import Trending from './pages/Trending';
import User from './pages/User';
import { Pages } from './Tools';

const client = new ApolloClient({
  uri: 'https://project-share-api.herokuapp.com/graphql',
  cache: new InMemoryCache()
});

const App: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [page, setPage] = useState<Pages>(Pages.HOME);
  const [display, setDisplay] = useState(<Home token={token} />);
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    switch(page) {
      case Pages.HOME:
        setDisplay(<Home token={token} />);
        break;
      case Pages.AUTH:
        setDisplay(<Auth setToken={setToken} />);
        break;
      case Pages.ABOUT:
        setDisplay(<About />);
        break;
      case Pages.CATEGORIES:
        setDisplay(<Categories setCategory={setCategory} />);
        break;
      case Pages.CATEGORY_PAGE:
        setDisplay(<CategoryPage category={category} />);
        break;
      case Pages.EDIT:
        setDisplay(<Edit />);
        break;
      case Pages.LEADERBOARD:
        setDisplay(<Leaderboard />);
        break;
      case Pages.NEWPOST:
        setDisplay(<NewPost token={token} />);
        break;
      case Pages.SUPPORTED:
        setDisplay(<Supported />);
        break;
      case Pages.SUPPORTING:
        setDisplay(<Supporting />);
        break;
      case Pages.TRENDING:
        setDisplay(<Trending token={token} />);
        break;
      case Pages.USER:
        setDisplay(<User />);
        break;
      default:
        setDisplay(<Text>Error...</Text>);
    }
  }, [page])

  return (
    <ApolloProvider client={client}>
      <View>
        <Navigation
          page={page} 
          setPage={setPage}
        />
        {
          display
        }
      </View>
    </ApolloProvider>
  );
}

export default App;