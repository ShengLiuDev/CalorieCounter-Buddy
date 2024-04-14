import React from 'react';
import './Home.css';
import mainHeader from '../../images/homepage-banner.jpg';

const Home = () => {
    return (
        <section>
            <div className="home-page">
                <div className="home-page-banner-icon">
                    <img src={mainHeader} alt="Homepage Banner" className="home-icon" />
                    {/* Place your welcome text outside of the img tag */}
                    <h2>Welcome to Calorie Counter Buddy!</h2>
                    <p>We are your one stop shop for your fitness goals.</p>
                </div>
            </div>
        </section>
    );
};

export default Home;
