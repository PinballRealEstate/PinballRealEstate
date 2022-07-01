/* You ended up with a really great product here! I would ike to see the material ui component files become a bit cleaner (perhaps by using the material UI theme API: https://mui.com/material-ui/customization/theming/), since I think thoser files would be a chore to maintain for anybody inheriting this codebase. You did a great job working through the complexity of MapBox, with some great munging to get the data you had in the shape you want. */

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
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
import './components/Spinner.css';
import About from './components/About';



export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserOnLoad() {
      const user = await getUser();

      if (user) {
        setUser(user);
      }
    }

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
        <main>
          <Switch>
            <Route exact path="/">
              {user
                ? <Redirect to="/search"/>
                : <SignIn setUser={setUser}/>}
            </Route>
            <Route exact path="/signup">
              {user
                ? <Redirect to="/search"/>
                : <SignUp setUser={setUser}/>}
            </Route>
            <Route exact path="/search">
              {user ? <Search /> : <Redirect to="/"/>}
            </Route>
            <Route exact path="/detail/:id">
              {user ? <Detail /> : <Redirect to="/"/>}
            </Route>
            <Route exact path="/profile">
              {user ? <Profile /> : <Redirect to="/"/>}
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

