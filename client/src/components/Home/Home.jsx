import React, { useState, useEffect } from 'react'; 
import './Home.css';
import mainHeader from '../../images/homepage-banner.jpg';
import workoutVideos from '../../videos/index.js';

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
                            <div className="homepage-subtext">
                                We are your one stop shop for your fitness goals. 
                                <br></br>
                                Find recipes, your calorie tracking needs, and 
                                <br></br>
                                share your own recipes with your friends all here. 
                            </div>   
                    </div>
                    <video src={workoutVideos[videoIndex]} width="100%" height="auto" muted autoPlay loop className="workout-video"/>
                </div>
            </div>
        </section>
    );
};

export default Home;
