import React, { useState, useEffect }from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/auth';
import { useAuth } from '../../contexts/authContext';

const Login = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  //redirect if the user is logged in 
  useEffect(() => {
    if (userLoggedIn) {
      navigate('/');
    }
  }, [userLoggedIn, navigate]);

  const onSubmit = async(e) => {
    e.preventDefault()
    setIsSigningIn(true);

    try {
      await doSignInWithEmailAndPassword(email, password);
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

  return (
    <div className='container mt-5'>
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
                <div className='mb-3'>
                  <label htmlFor='passwordInput' className='form-label'>Password</label>
                  <input 
                    type='password' 
                    className='form-control' 
                    id='passwordInput' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                  />
                </div>
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
    </div>
  );
};

export default Login;

// export default function Login() {
//   return (
//     <div className='login-wrapper'>
//       <div className='login-title'>
//         <h1>Login</h1>
//       </div>
//       <form>
//         <div className='email-section'>
//           <label>
//             <p>Email</p>
//             <input type="text" />
//           </label>
//         </div>
//         <div className='password-section'>
//           <label>
//             <p>Password</p>
//             <input type="password" />
//           </label>
//         </div>
//         <div className='login-button'>
//           <button type="submit">Submit</button>
//         </div>
//         <div>
//           <p>Don't have an account yet?
//             <Link to="/signup" className='signup-text'>
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// }
