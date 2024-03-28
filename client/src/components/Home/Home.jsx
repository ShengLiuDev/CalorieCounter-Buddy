import React from 'react';
import './Home.css';
import food1Image from '../../images/food1.jpg';
import food2Image from '../../images/food2.jpg';
import food3Image from '../../images/food3.jpg';

const Home = () => {
    return(
        <div className="home-page">
                <div className="row">
                    <div className="col">
                    
                    </div>
                    <div className="col">
                        <img src={food3Image} className="fade-from-right img-fluid" alt="Image 1" />
                        {/* <img src={food2Image} width="300" height = "300" className="fade-in-from-right" alt="Image 2" />
                        <img src={food3Image}  width="300" height = "300" className="fade-in-from-right" alt="Image 3"/> */}
                    
                    </div>
                </div>
        </div>
    )
};

export default Home;
