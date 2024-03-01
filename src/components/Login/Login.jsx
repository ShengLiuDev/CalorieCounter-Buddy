import React from 'react';
import { Link } from 'react-router-dom'

export default function Login() {
  return(
    <div className='login-wrapper'>
        <h1>Please login with your account credentials</h1>
        <form>
        <label>
            <p>Username</p>
            <input type="text" />
        </label>
        <label>
            <p>Password</p>
            <input type="password" />
        </label>
        <div>
            <button type="submit">Submit</button>
        </div>
        <div>
          <p>Don't have an account?</p>
          <Link to="/signup" className='signup-text'>
            Sign up Here
          </Link>
        </div>
        </form>
    </div>
  )
}