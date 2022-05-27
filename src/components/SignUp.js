import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from '../services/supabase-utils';
import CustomSlider from './CustomSlider';

export default function SignUp({ setUser }) {

  const [signUpData, setSignUpData] = useState({
    username: '',
    email: '',
    password: '',
    low_price: '',
    high_price: '',
    zip_code: '',
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
        <label> Username:
          <input required type='username' onChange={(e) => setSignUpData({
            username: e.target.value,
            email: signUpData.email,
            password: signUpData.password
          })}/>
        </label>
        <label>Email<input required type='email' onChange={ e => setSignUpData({
          email: e.target.value,
          password: signUpData.password
        })}/></label>
        <label>Password<input required type='password' onChange={ e => setSignUpData({
          email: signUpData.email,
          password: e.target.value
        })}/></label>
        <label> Price Range: 
          <CustomSlider setSignUpData={setSignUpData} />
        </label>
        <label> Zip Code: 
          <input required type='number' onChange={(e) => setSignUpData({
            username: e.target.value,
            email: signUpData.email,
            password: signUpData.password,
            zip_code: e.target.value
          })}/>
        </label>
        <button>Sign Up</button>
      </form>
      <Link to={'/signin'}>Sign In</Link>
      <Link to={'/about'}>About</Link>
    </div>
  );
}
