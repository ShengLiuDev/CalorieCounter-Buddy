import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Login from '../../components/Login/Login';
import './Profile.css';
import alvin from '../../images/alvin.jpg';

const Profile = () => {
    console.log("WAHOOOOOOOOO TESTING TESTING TESTI");

    return (
        <section>
            <div className="profile-container">
                <div className="profile-header-text">
                    Welcome to Your Profile
                    <hr></hr>
                </div>
                <div className="vertical-line">
                    
                </div>
            </div>
            <div className="profile-options-container">
                <Link className="personal-information">

                </Link>
                <Link className="calorie-count">

                </Link>
                <Link className="upload-recipe">

                </Link>
            </div>
        </section>
    );
};

export default Profile;
