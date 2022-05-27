import React, { useState } from 'react';
import { signIn } from '../services/supabase-utils';
import { useHistory } from 'react-router-dom';

export default function SignIn({ setToken }) {
  const { push } = useHistory();
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  async function handleSignIn(e) {
    e.preventDefault();

    const { access_token } = await signIn(signInData.email, signInData.password);

    setToken(access_token);
    push('/');
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
