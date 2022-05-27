import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Search from './components/Search';
import Profile from './components/Profile';
import Detail from './components/Detail';

export default function App() {
  return (
    <Router>
      <div>
        <header className='App-header'>
          <h1>
            Pinball Real Estate
          </h1>
        </header>
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <Search />
          </Route>
          <Route path="/detail:?id">
            <Detail />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
