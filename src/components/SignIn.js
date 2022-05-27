import React, { useState } from 'react';
import { signIn } from '../services/supabase-utils';

export default function SignIn({ setToken }) {

  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  })

  async function handleSignIn(e) {
    e.preventDefault()

    const user = await signIn(signInData.email, signInData.password);

    setToken(user.access_token);
  }

  return (
    <div>
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
    </div>
  );
}
