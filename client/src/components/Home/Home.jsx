import React, { useState } from 'react';
import './Home.css';
import food1Image from '../../images/food1.jpg';
import food2Image from '../../images/food2.jpg';
import food3Image from '../../images/food3.jpg';

const Home = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [searchInput, setSearchInput] = useState('');

    const images = [
        food2Image,
        food3Image,
    ];

    const handleAnimationEnd = (e) => {
        if (e.target.tagName.toLowerCase() === 'img') {
            // Resetting animation by removing and re-adding the CSS class
            e.target.classList.remove('fade-from-right');
            void e.target.offsetWidth; // Trigger reflow to force repaint
            e.target.classList.add('fade-from-right');
    
            setCurrentImage((prevImage) => {
                const nextImageIndex = prevImage >= images.length - 1 ? 0 : prevImage + 1;
                console.log(nextImageIndex)
                return nextImageIndex;
            });
        }
    };

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };
    
    return(
        <div className="home-page">
            <main className="container-fluid d-flex h-100 flex-column">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col text-center">
                        <input className="search_bar alert dark-alert" type="text" placeholder="Search for a recipe..." value={searchInput} onChange={handleInputChange} />
                    </div>
                    <div className="col text-center">
                        <img src={images[currentImage]} className="fade-from-right" alt={`Image ${currentImage + 1}`} onAnimationEnd={handleAnimationEnd}/>
                    </div>
                </div>
                
                <div className="row">

                </div>
            </main>
        </div>
    )
};

export default Home;
