import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import GatorLogo from "../../icons/gatorlogo.png"
import LoginIcon from "../../icons/my-account-login.svg"

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm">
            <div className="container-fluid">

                {/* Navbar brand */}
                <Link className="navbar-brand" to="/">
                    <img src={GatorLogo} className="d-inline-block align-top img-responsive" alt="Gator Logo" width="90" height="50"/>
                </Link>

                {/* Navbar links */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav mr-auto"> {/* Use mr-auto to push navbar links to the left */}
                        {/* Popular link */}
                        <Link className="nav-link" to="/popular">Popular</Link>
                        {/* Calories link */}
                        <Link className="nav-link" to="/calorie-counter">Calories</Link>
                        {/* About Us link */}
                        <Link className="nav-link" to="/about">About Us</Link>
                        {/* Upload Recipe link */}
                        <Link className="nav-link" to="/upload-recipe">Upload Recipe</Link>
                    </div>
                </div>

                {/*Stuff on the Right Hand Side */}
                {/* Login link */}
                <Link className="login" to="/login">
                    <img src={LoginIcon} className="login d-inline-block align-top img-responsive" alt="Login Icon" width="30" height="30" />
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
