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

  async function handleSignIn(e) {
    e.preventDefault();

    const user = await signIn(signInData.email, signInData.password);

    setUser(user);
    push('/');
  }
  async function handleLogout() {
    await logout();

    setSignInData(null);
    setUser(null);
  }

  return (
    <div className='signIn'>
      <img src={'public/generic-home2.jpg'}/>
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
      <Link to={'/signup'}>Sign Up</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
