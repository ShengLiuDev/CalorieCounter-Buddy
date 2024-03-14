import React from 'react';
import './Home.css';
import food1Image from '../../images/food1.jpg';
import food2Image from '../../images/food2.jpg';
import food3Image from '../../images/food3.jpg';

const Home = () => {
    return(
        <div className="home-page">

            <div className="container">
                <div className="row">
                    <div className="col">
                    1 of 2
                    </div>
                    <div className="col">
                        <div className="col-md-4">
                            <img src={food1Image} width="300" height = "300" className="stack-image" alt="Image 1" style={{ transform: 'rotate(-10deg)' }}/>
                            <img src={food2Image} width="300" height = "300" className="stack-image" alt="Image 2" style={{ transform: 'rotate(10deg)' }}/>
                            <img src={food3Image}  width="300" height = "300" className="stack-image" alt="Image 3" style={{ transform: 'rotate(5deg)' }}/>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
};

export default Home;
