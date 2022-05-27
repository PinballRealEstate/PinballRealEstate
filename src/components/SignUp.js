import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from '../services/supabase-utils';

export default function SignUp({ setUser }) {

  const [signUpData, setSignUpData] = useState({
    email: '',
    password: ''
  });

  async function handleSignUp(e) {
    e.preventDefault();

    const user = await signUp(signUpData.email, signUpData.password);

    setUser(user);
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <label>Email<input required type='email' onChange={ e => setSignUpData({
          email: e.target.value,
          password: signUpData.password
        })}/></label>
        <label>Password<input required type='password' onChange={ e => setSignUpData({
          email: signUpData.email,
          password: e.target.value
        })}/></label>
        <button>Sign Up</button>
      </form>
      <Link to={'/signin'}>Sign In</Link>
    </div>
  );
}
