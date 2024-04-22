import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from '../../firebase/auth';
import { auth } from '../../firebase/firebase';
import './Profile.css';

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
        <section>
            <div className="profile-container">
                <div className="profile-header-text">
                    Welcome to Your Profile
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
            <div className="profile-options-container">
                <a className="calorie-counter" href="/calorie-counter">
                    Calorie Counter
                    <br></br>
                    <br></br>
                </a>
                <a className="upload-recipe" href="upload-recipe">
                    Upload Your Recipes
                    <br></br>
                    <br></br>
                </a>
                <a className="user-saved-recipes" href="saved-recipes">
                    Saved Recipes
                </a>
            </div>
        </section>
    );
};

export default Profile;
