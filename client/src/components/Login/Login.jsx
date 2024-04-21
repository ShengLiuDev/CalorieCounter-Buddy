import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn, doSignInWithGoogle } from '../../firebase/auth';
import { useAuth } from '../../contexts/authContext';
import './Login.css';

import { Icon } from 'react-icons-kit';
import { eye } from 'react-icons-kit/entypo/eye';
import { withLine } from 'react-icons-kit/entypo/withLine';

const Login = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  console.log("this is the current useAuth() state: ", useAuth());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(withLine);

  const togglePasswordVisibility = () => {
    if (type == 'password')
    {
        setIcon(eye);
        setType('text');
    } else {
        setIcon(withLine);
        setType('password');
    }
    setPasswordShown(!passwordShown);
  }

  //redirect if the user is logged in 
  useEffect(() => {
    console.log("use state of the userLoggedIn variable is: ", userLoggedIn);
    if (userLoggedIn) {
      navigate('/profile');
    }
  }, [userLoggedIn, navigate]);

  const onSubmit = async(e) => {
    e.preventDefault()
    setIsSigningIn(true);

    try {
      await signIn(email, password);
    } 
    catch (error){
      setErrorMessage(error.message);
    }
    setIsSigningIn(false);
  }

  const onGoogleSignIn = async(e) => {
    e.preventDefault()
    setIsSigningIn(true);

    try {
      await doSignInWithGoogle();
    } 
    catch (error){
      setErrorMessage(error.message);
    }
    setIsSigningIn(false);
  }
  // create userState method that stores checks if userisloggedin 
  // (if so, reroute to profile page rather than login) 

  return (
    // <div className='container mt-5'> causes white border at top
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <h2 className='card-header text-center'>Login</h2>
            <div className='card-body'>
              {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
              <form onSubmit={onSubmit}>
                <div className='mb-3'>
                  <label htmlFor='emailInput' className='form-label'>Email</label>
                  <input 
                    type='email' 
                    className='form-control' 
                    id='emailInput' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                  />
                </div>
                <div>
                  <div className='mb-3'>
                    <label htmlFor='passwordInput' className='form-label'>Password</label>
                    <input 
                      type={passwordShown ? 'passwordText' : 'password'} 
                      className='form-control' 
                      id='passwordInput' 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required
                    />
                  </div>
                  <div className="input-group-append">
                    <span className="flex justify-around items-center" onClick={togglePasswordVisibility}>
                        <Icon className="absolute mr-10" icon={icon} size={20}/>
                    </span>
                  </div>
                </div>
                <p>

                </p>
                <div className='d-grid gap-2'>
                  <button type='submit' className='btn btn-primary' disabled={isSigningIn}>Submit</button>
                  <button onClick={onGoogleSignIn} className='btn btn-danger' disabled={isSigningIn}>Sign in with Google</button>
                </div>
                <div className='mt-3'>
                  <p>Don't have an account yet? <Link to="/signup" className='link-primary'>Sign up</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Login;
