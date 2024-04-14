import React, { useState, useEffect } from 'react'; 
import './Home.css';
import mainHeader from '../../images/homepage-banner.jpg';
import workoutVideos from '../../videos/index.js';

import alvin from '../../images/alvin.jpg';
import devika from '../../images/devika.jpg';
import johnny from '../../images/johnny.jpg';

const Home = () => {
    const [videoIndex, setVideoIndex] = useState(0);
    
    useEffect(() => {
        const videoChangeInterval = setInterval(() => {
            setVideoIndex((current) => (current + 1) % workoutVideos.length); // Loop through videos
        }, 10000);

        return () => clearInterval(videoChangeInterval);
    }, []);

    return (
        <section>
            <div className="home-page">
                <div className="home-page-banner-icon">
                    <img src={mainHeader} alt="Homepage Banner" className="home-icon" />
                    {/* Place your welcome text outside of the img tag */}
                    <div className="homepage-text"> 
                        <h1>Welcome to CCB</h1>
                        <hr></hr>
                        <br></br>
                            <div className="homepage-subtext">
                                We are your one stop shop for your fitness goals. 
                                <br></br>
                                Find recipes, your calorie tracking needs, and 
                                <br></br>
                                share your own recipes with your friends all here. 
                            </div>   
                    </div>
                    <video src={workoutVideos[videoIndex]} width="100%" height="auto" muted autoPlay loop className="workout-video"/>
                    <hr></hr>
                </div>
                <div className="about-us-container">
                
                    <div className='about-us-pictures'>
                        <img src={johnny} className='professional-headshots'></img>
                        <img src={alvin} className='professional-headshots'></img>
                        <img src={devika} className='professional-headshots'></img>
                    </div>
                    <div className="about-us-content">
                        <div className="about-us-header">
                            
                            About Us
                        </div>
                        <p className="about-us-text">
                            We are UF students who are always busy with our class schedules

                            leaving no time in the day to cook or track our calories thoughtout

                            the day. Thus, we decided to create CCB or Calorie Counter Buddy

                            to help UF students keep track of their daily caloric intake, look 

                            for, and share recipes with their friends and family. Made by UF 

                            students for UF students, that's what we're proud of. 
                        </p>
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default Home;
