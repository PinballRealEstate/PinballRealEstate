import React, { useState, useEffect } from 'react';
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
import { getAllHomes } from './services/fetch-utils';
import { getUser } from './services/supabase-utils';

export default function App() {
  const [listings, setListings] = useState([]);
  const [token, setToken] = useState(null);

  async function getUserOnLoad(){
    const user = await getUser();

    setToken(user.access_token);

  }

  useEffect(() => {
    // async function getListings() {
    //   const { home_search } = await getAllHomes();
    //   console.log('data', home_search);
    //   setListings(home_search.results);
    // }
    // getListings();
    getUserOnLoad();
  }, []);

  return (
    <Router>
      <div>
        <header className='App-header'>
          <h1>
            Pinball Real Estate
          </h1>
        </header>
        <div>
          {/* {listings.map((listing, i) => <p key={i}>{listing.location.address.line}</p>)} */}
        </div>
        <Switch>
          <Route path="/signin">
            <SignIn setToken={setToken}/>
          </Route>
          <Route path="/signup">
            <SignUp setToken={setToken}/>
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
