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
import CustomMenu from './components/CustomMenu';
// import { getAllHomes } from './services/fetch-utils';
import { getUser } from './services/supabase-utils';
import './components/Search.css';



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
          {
            user && <CustomMenu setUser={setUser}/>
          }
        </header>
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

