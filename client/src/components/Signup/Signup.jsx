import React from 'react';
import { Link } from 'react-router-dom'

export default function Signup() {
    return(
    <div className="signup-wrapper">
        <h1>Sign up for a Calorie Counter Buddy account below!</h1>
        <form>
            <label>
                <p>Email</p>
                <input type="email" />
            </label>
            <label>
                <p>Username</p>
                <input type="text" />
            </label>
            <label>
                <p>Password</p>
                <input type="password" />
            </label>
            <div>
                <button type="submit">Sign Up</button>
            </div>
            <div>
            <p>Already have an account?</p>
            <Link to="/" className="login-text">
                Login Here
            </Link>
            </div>
        </form>
    </div>
    );
}