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
          </Switch>
        </main>
      </div>
    </Router>
  );
}

