import React, { useState, useEffect, useRef } from 'react'; 
import './Home.css';
import mainHeader from '../../images/homepage-banner.jpg';
import workoutVideos from '../../videos/index.js';
import Navbar from '../Navbar/Navbar';

import alvin from '../../images/alvin.jpg';
import devika from '../../images/devika.jpg';
import johnny from '../../images/johnny.jpg';

const Home = () => {
    const [videoIndex, setVideoIndex] = useState(0);
    const aboutUsRef = useRef(null);
    const contactUsRef = useRef(null);
  
    const onScrollToSection = (sectionID) => {
      let ref;
      if (sectionID === 'about-us') {
        ref = aboutUsRef;
      } 
      else if (sectionID === 'contact-us') {
        ref = contactUsRef;
      }
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    
    useEffect(() => {
        const videoChangeInterval = setInterval(() => {
            setVideoIndex((current) => (current + 1) % workoutVideos.length); // Loop through videos
        }, 10000);

        return () => clearInterval(videoChangeInterval);
    }, []);

    console.log("onScrollToSection function outputttttttttttttt: " + onScrollToSection);
    return (
        <section>
            <Navbar onScrollToSection={onScrollToSection} />
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
                    <div className='video-container'>
                        <video src={workoutVideos[videoIndex]} width="100%" height="auto" muted autoPlay loop className="workout-video"/>

                    </div>
                </div>
                
                <div ref={aboutUsRef} id="about-us" className="about-us-container" >
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

                <div ref={contactUsRef} id="contact-us" className="contact-us-section">
                    <div className='contact-us-header'>
                        Contact Us
                        <hr></hr>

                        <div className='contact-us-subtext'>
                        <br></br>
                            Need to get in touch with us? Either fill out this form 
                            or send us an email at <span className='our-email'>caloriecounterbuddy@gmail.com</span>
                        </div>
                        <div className='contact-us-information'>
                            <form className='first-name-form'>
                                <label>
                                    First Name:
                                    <input type="text" firstName="first-name"/>
                                </label>
                            </form>
                            <form className='last-name-form'>
                                <label>
                                    Last Name:
                                    <input type="text" lastName="last-name"/>
                                </label>
                            </form>
                            <form className='email-form'>
                                <label> 
                                    Email:
                                    <input type="text" email="email"/>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
