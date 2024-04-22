import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import GatorLogo from "../../icons/gatorlogo.png"
import LoginIcon from "../../icons/my-account-login.svg"
import SearchIcon from "../../icons/search.svg"

const Navbar = ({onScrollToSection}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavBarClick = (sectionID) => (event) => {
        // Check if we're already on the homepage
        if (location.pathname === '/') {
            // Prevent the default anchor behavior
            event.preventDefault();
            // Scroll to the top of the page
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onScrollToSection(sectionID);
        } 
        else if (location.pathname != '/'){
            // If we're not on the homepage, navigate to the homepage
            navigate('/');
        }
    }

    return (
        <nav className="navbar navbar-expand-sm">
            <div className="container-fluid">

                {/* Navbar brand */}
                <Link className="navbar-brand" to="/">
                    <img src={GatorLogo} className="d-inline-block align-top img-responsive" alt="Gator Logo" width="110" height="70" onClick={handleNavBarClick('home')}/>
                </Link>

                {/* Navbar links */}
                <div className="collapse-navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav mr-auto"> {/* Use mr-auto to push navbar links to the left */}
                        {/* Home link */}
                        <a className="nav-link" href="#home" onClick={handleNavBarClick('home')}>Home</a>
                        {/* About Us link scrolls to about us section*/}
                        <a className="nav-link" href="#about-us" onClick={handleNavBarClick('about-us')}>About Us</a>
                        {/* Contact Us link scrolls to bottom of page */}
                        <a className="nav-link" href="#contact-us" onClick={handleNavBarClick('contact-us')}>Contact Us</a>
                        {/* Popular link */}
                        <Link className="nav-link" to="/popular">Popular Recipes</Link>
                    </div>
                </div>
                {/*Stuff on the Right Hand Side */}
                {/* Search link */}
                <div className="right-side-icons">
                    <Link className="search" to="/search">
                        <img src={SearchIcon} className="search-icon" alt="Search Icon" width="20" height="20" />
                    </Link>
                    {/* Login link */}
                    <Link className="login" to="/login">
                        <img src={LoginIcon} className="login-icon" alt="Login Icon" width="30" height="30" />
                    </Link>
                </div>
                
            </div>
        </nav>
    );
}

export default Navbar;
