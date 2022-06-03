import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { createProfile, signUp, createFilter } from '../services/supabase-utils';
import CustomSlider from './CustomSlider';
import './SignUp.css';

export default function SignUp({ setUser }) {
  const { push } = useHistory();
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
    await createProfile(signUpData);
    await createFilter(signUpData);
    setUser(user);
    push('/search');
  }

  return (
    <div className='signUpPage'>
      <div className='signUp'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <label> Username:
            <input required type='username' onChange={(e) => setSignUpData({
              ...signUpData, 
              username: e.target.value,           
            })}/>
          </label>
          <label>Email:
            <input required type='email' onChange={ e => setSignUpData({
              ...signUpData,
              email: e.target.value,
            })}/></label>
          <label>Password:
            <input required type='password' onChange={ e => setSignUpData({
              ...signUpData,
              password: e.target.value
            })}/></label>
          <label> Price Range: 
            <CustomSlider setSignUpData={setSignUpData} signUpData={signUpData} />
          </label>
          <label> Zip Code: 
            <input required type='number' onChange={(e) => setSignUpData({
              ...signUpData,
              zip_code: e.target.value
            })}/>
          </label>
          <button>Sign Up</button>
        </form>
        <Link to={'/'} className='link'>Sign In</Link>
        <Link to={'/about'} className='link'>About</Link>
      </div>
      
    </div>
  );
}
