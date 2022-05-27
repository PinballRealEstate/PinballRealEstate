import React from 'react';

export default function SignUp({ setToken }) {

  const [signUpData, setSignUpData] = useState({
    email: '',
    password: ''
  })

  async function handleSignUp(e) {
    e.preventDefault()

    const user = await signUp(signUpData.email, signUpData.password);

    setToken(user.access_token);
  }

  return (
    <div>
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
    </div>
  );
}
