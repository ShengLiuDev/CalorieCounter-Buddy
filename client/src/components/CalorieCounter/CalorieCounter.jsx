import React, { useReducer, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'; 
import { useAuth } from '../../contexts/authContext';
import { writeUserCalorieData, getUserCalorieData } from '../../firebase/database';
import './CalorieCounter.css'

function CalorieCounter() {
    const { currentUser, userLoggedIn } = useAuth();

    const formReducer = (state, event) => {
        if(event.reset) {
            return {
              FoodItem: ''
            }
          }
        return {
          ...state,
          [event.name]: event.value
        }
    }

    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);
    var contributor_id= '1234';

    if(userLoggedIn){
        contributor_id = currentUser.uid;
    }
    const navigate = useNavigate();
    var [soFar, setsoFar] = useState(null);
    //Place this code in part for profile page
    

    useEffect(() => {
        async function fetchData() {
            try {
                if (userLoggedIn) {
                    const cals = await getUserCalorieData(contributor_id);
                    setsoFar(cals);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
        fetchData();
    }, [userLoggedIn, contributor_id]);

    var [cals, setCals] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userLoggedIn) {
            // If user is not logged in, redirect to the login page
            navigate('/login') // Change '/login' to the path of your login page
            return; // Exit the function to prevent further execution
        }
        
        // var contributor_id= '1234';

        // if(userLoggedIn){
        //     contributor_id = currentUser.uid;
        // }

        const updatedFormData = {
            ...formData 
        };

        const response = await axios.get(`http://localhost:3001/api/ingredients/name/${updatedFormData.FoodItem}`);
        console.log(response.data); // Handle the response data
        const calories = response.data;
        cals = setCals(calories);

        //post response data to firebase database, with contributor_id
        await writeUserCalorieData(contributor_id, calories);

        const val = await getUserCalorieData(contributor_id);
        setsoFar(val);

        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
            setFormData({
                reset: true
              })
          }, 3000)

    }
    console.log('Calories: ', cals);

    const handleChange = event => {
        setFormData({
          name: event.target.name,
          value: event.target.value,
        });
    }

    

    return(
        <div className='wrapper'>
            <div className='background-photo-page'>
                <h1 className='text-bold'>Upload your caloric intake</h1>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <label>
                        <p>Food Item</p>
                        <input name="FoodItem" onChange={handleChange} value={formData.FoodItem || ''}/>
                        </label>
                    </fieldset>
                </form>
                <fieldset>
                    <button onClick={handleSubmit} className='upload-submit-btn'>Submit</button>
                </fieldset>
                {submitting &&
                <div >You just consumed {cals} calories!</div>}
            </div>
        </div>
       
    )
};

export default CalorieCounter;