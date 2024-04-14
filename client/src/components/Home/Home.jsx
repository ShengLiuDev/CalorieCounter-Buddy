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
                    <div class="homepage-text"> 
                        Welcome to Calorie Counter Buddy!
                        <br></br>
                        We are your one stop shop for your fitness goals.
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
