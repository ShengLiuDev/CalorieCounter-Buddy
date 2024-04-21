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
                    <img src={alvin}>

                    </img>
                </div>
            </div>
        </section>
    );
};

export default Profile;
