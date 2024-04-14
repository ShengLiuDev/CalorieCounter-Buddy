import React, { useState } from 'react';
import './Home.css';
import food1Image from '../../images/food1.jpg';
import food2Image from '../../images/food2.jpg';
import food3Image from '../../images/food3.jpg';

const Home = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const images = [
        food2Image,
        food3Image,
    ];

    const handleAnimationEnd = (e) => {
        // Resetting animation by removing and re-adding the CSS class
        e.target.classList.remove('fade-from-right');
        void e.target.offsetWidth; // Trigger reflow to force repaint
        e.target.classList.add('fade-from-right');

        setCurrentImage((prevImage) => {
            const nextImageIndex = prevImage >= images.length - 1 ? 0 : prevImage + 1;
            console.log(nextImageIndex)
            return nextImageIndex;
        });
    };

    return(
        <div className="home-page">
                <div className="home-page-banner-icon">
                    <img src="header-banner.png" alt="Homepage Banner" className="home-icon"> Welcome to Calorie Counter Buddy! We are your one stop shop for your fitness goals. </img>
                </div>
        </div>
    )
};

export default Home;
