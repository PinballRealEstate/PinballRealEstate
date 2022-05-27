import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Search from './components/Search';
import Profile from './components/Profile';
import Detail from './components/Detail';
// import { getAllHomes } from './services/fetch-utils';
import { getUser } from './services/supabase-utils';

export default function App() {
  // const [listings, setListings] = useState([]);
  const [user, setUser] = useState();

  async function getUserOnLoad(){
    const userOnLoad = await getUser();
    
    if (userOnLoad) {
      setUser(userOnLoad);
    }
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
          <Route exact path="/signin">
            <SignIn setUser={setUser}/>
          </Route>
          <Route exact path="/signup">
            <SignUp setUser={setUser}/>
          </Route>
          <Route exact path="/">
            {user ? <Search /> : <SignIn setUser={setUser}/>}
          </Route>
          <Route exact path="/detail/:id">
            {user ? <Detail /> : <SignIn setUser={setUser}/>}
          </Route>
          <Route exact path="/profile">
            {user ? <Profile /> : <SignIn setUser={setUser}/>}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

