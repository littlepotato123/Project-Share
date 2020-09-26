import React from 'react';
import FetchingExample from './Extras/Fetching';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/example">
          <FetchingExample />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
