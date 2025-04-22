import React from 'react';
import './App.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProfilePage from './pages/profile'; // Assuming this is your profile page
import HomePage from './pages/home';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/profile" component={ProfilePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
