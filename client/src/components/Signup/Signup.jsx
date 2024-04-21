import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser, doSignInWithGoogle } from '../../firebase/auth';
import { useAuth } from '../../contexts/authContext';
import revealPassword from "../../icons/reveal-password.png"
import './Signup.css';

import { Icon } from 'react-icons-kit';
import { eye } from 'react-icons-kit/entypo/eye';
import { withLine } from 'react-icons-kit/entypo/withLine';

const Signup = () => {
  const navigate = useNavigate();
  const { userSignedup } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(withLine);

  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const validatePassword = () => {
    return password == confirmPassword && passwordPattern.test(password);
  }

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

  // //redirect if the user is signedup to the login page
  // useEffect(() => {
  //   if (userSignedup) {
  //     navigate('/login');
  //   }
  // }, [userSignedup, navigate]);

  const onSubmit = async(e) => {
    e.preventDefault()
    if (!validatePassword()) {
        setErrorMessage("Passwords do not match or do not meet the criteria");
        return;
    }
    
    //setIsSigningUp(true); // once signed up this is causing error

    try {
        await createUser(email, password); 
        // make sure to use correct function for signing up]
        console.log("user account was created and stored");
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('');
    }
    catch (error) {
        setErrorMessage(error.message);
    }
    setConfirmationMessage("Account successfully created!")
    setIsSigningUp(false);
  }

  const onGoogleSignup = async(e) => {
    e.preventDefault()
    setIsSigningUp(true);

    try {
      await doSignupWithGoogle(); // same function for signing in with google, so just go home
      navigate('/home')
    } 
    catch (error){
      setErrorMessage(error.message);
    }
    setIsSigningup(false);
  }

  return (
    // <div className='container mt-5'> causing white border at top
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <h2 className='card-header text-center'>
              Signup
            </h2>
            <div className='card-body'>
              {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
              {confirmationMessage && <div className="alert alert-success" role="notification">{confirmationMessage}</div>}
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
                    <div className='mb-4'>
                        <label htmlFor='passwordInput2' className='form-label'>Re-Enter Password</label>
                        <input 
                            type={passwordShown ? 'passwordText' : 'password'} 
                            className='form-control' 
                            id='passwordInput2' 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required
                        />
                        <p>
                          
                        </p>
                        <div className="input-group-append">
                            <span className="flex" onClick={togglePasswordVisibility}>
                                <Icon className="absolute mr-10" icon={icon} size={20}/>
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className='d-grid gap-2'>
                  <button type='submit' className='btn btn-primary' disabled={isSigningUp}>Signup</button>
                  <button onClick={onGoogleSignup} className='btn btn-danger' disabled={isSigningUp}>Sign up with Google</button>
                </div>
                <div className='mt-3'>
                  <p>Have an account already? <Link to="/login" className='link-primary'>Login</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Signup;
