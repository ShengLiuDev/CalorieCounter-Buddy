import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import GatorLogo from "../../icons/gatorlogo.png"
import LoginIcon from "../../icons/my-account-login.svg"
import SearchIcon from "../../icons/search.svg"

const Navbar = ({onScrollToSection}) => {

    const handleNavBarClick = (sectionID) => (event) => {
        event.preventDefault();
        onScrollToSection(sectionID);
    }

    return (
        <nav className="navbar navbar-expand-sm">
            <div className="container-fluid">

                {/* Navbar brand */}
                <Link className="navbar-brand" to="/">
                    <img src={GatorLogo} className="d-inline-block align-top img-responsive" alt="Gator Logo" width="110" height="70"/>
                </Link>

                {/* Navbar links */}
                <div className="collapse-navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav mr-auto"> {/* Use mr-auto to push navbar links to the left */}
                        {/* Home link */}
                        <Link className="nav-link" to="/">Home</Link>
                        {/* Popular link */}
                        <Link className="nav-link" to="/popular">Popular</Link>
                        {/* About Us link */}
                        <a className="nav-link" href="#about-us" onClick={handleNavBarClick('about-us')}>About Us</a>
                        {/* Contact Us link scrolls to bottom of page */}
                        <a className="nav-link" href="#contact-us" onClick={handleNavBarClick('about-us')}>Contact Us</a>
                    </div>
                </div>
                {/*Stuff on the Right Hand Side */}
                {/* Search link */}
                <Link className="search" to="/search">
                    <img src={SearchIcon} className="search-icon" alt="Search Icon" width="20" height="20" />
                </Link>
                {/* Login link */}
                <Link className="login" to="/login">
                    <img src={LoginIcon} className="login-icon" alt="Login Icon" width="30" height="30" />
                </Link>
                
            </div>
        </nav>
    );
}

export default Navbar;
