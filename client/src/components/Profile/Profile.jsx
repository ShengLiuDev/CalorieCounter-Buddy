import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from '../../firebase/auth';
import { auth } from '../../firebase/firebase';
import './Profile.css';
import profileBackground from '../../images/profile-background.jpg';

const Profile = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;
    const userEmail = user ? user.email : null;
    const userPassword = user ? user.password : null;

    // this handles the logout of the user and resets login state 
    const handleLogout = () => {
        signOut(auth).then(() => {
            //signout successful
            navigate('/');
            console.log("signout was successful");
        }).catch((error) => {
            console.log("an error happened here");
        });
    }



    return (
        <section className="whole-profile-container">
            <div className="profile-container">
                <div className="profile-header-text">
                    Welcome to Your Profile!
                    <div className="profile-header-subtext">
                        We're glad you're here to meet your fitness goals
                    </div>
                    <hr className="profile-underline"/>
                </div>
                <div className="vertical-line">
                </div>
                <div className="account-information-header">
                        Account Info
                    <div className="login-information">
                        <br></br>
                        {userEmail && <p>Email: {userEmail}</p>}
                    </div>
                    <div className="logout-btn">
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            {/* <img src={profileBackground} className="profile-background"/> */}
            <div className="profile-options-container">
                <div className="options-header">
                Track Your Goals
                </div>
                <a href="upload-recipe" className="profile-link upload-recipe">
                    Upload Your Recipes
                </a>
                <a href="calorie-counter" className="profile-link calorie-counter">
                    Calorie Counter
                </a>
                <a href="user-saved-recipes" className="profile-link user-saved-recipes">
                    Saved Recipes
                </a>
            </div>
        </section>
    );
};

export default Profile;
