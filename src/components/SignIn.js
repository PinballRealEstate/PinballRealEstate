import React, { useState } from 'react';
import { logout, signIn } from '../services/supabase-utils';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './SignIn.css';

export default function SignIn({ setUser }) {
  const { push } = useHistory();
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  
  //function to log a user in by email and password kept in supabase
  async function handleSignIn(e) {
    e.preventDefault();

    const user = await signIn(signInData.email, signInData.password);

    setUser(user);
    push('/');
  }

  //function to clear the user and end a session
  async function handleLogout() {
    await logout();

    setSignInData(null);
    setUser(null);
  }

  return (
    <div className='signInPage'>
      <div className='signIn'>
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <label>Email<input required type='email' onChange={ e => setSignInData({
            email: e.target.value,
            password: signInData.password
          })}/></label>
          <label>Password<input required type='password' onChange={ e => setSignInData({
            email: signInData.email,
            password: e.target.value
          })}/></label>
          <button>Sign In</button>
        </form>
        {/* link to sign up page */}
        <Link to={'/signup'}>Sign Up</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
    
  );
}
