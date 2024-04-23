import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from '../../firebase/auth';
import { auth } from '../../firebase/firebase';
import { useAuth } from '../../contexts/authContext';
import { getUserCalorieData, calorieReset } from '../../firebase/database';
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

    const { currentUser, userLoggedIn } = useAuth();
    var contributor_id= '1234';

    if(userLoggedIn){
        contributor_id = currentUser.uid;
    }
    var [soFar, setsoFar] = useState(null);
    //Place this code in part for profile page
    

    useEffect(() => {
        async function fetchData() {
            try {
                if (userLoggedIn) {
                    const cals = await getUserCalorieData(contributor_id);
                    setsoFar(cals);
                    console.log(soFar);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
        fetchData();
    }, [userLoggedIn, contributor_id]);


    const handleReset = async(e) => {
        e.preventDefault();

        await calorieReset(contributor_id);
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
                        <button onClick={handleLogout} type="button">
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
                <a href="saved-recipes" className="profile-link user-saved-recipes">
                    Saved Recipes
                </a>
                <p className='calories-number'>Calories consumed so far: {soFar}</p>
                <button onClick={handleReset} className='reset-button'>Reset Calories</button>
            </div>
        </section>
    );
};

export default Profile;
