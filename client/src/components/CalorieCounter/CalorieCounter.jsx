import React, { useReducer, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'; 
import { useAuth } from '../../contexts/authContext';
import { writeUserData, getUserData } from '../../firebase/database';
import './CalorieCounter.css'

function CalorieCounter() {
    const { currentUser, userLoggedIn} = useAuth();

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

    const soFar = getUserData(contributor_id);
    console.log(soFar);
    const navigate = useNavigate();
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

        //post response data to firebase database, with contributor_id
        await writeUserData(contributor_id, calories);

        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
            setFormData({
                reset: true
              })
          }, 3000)

    }

    const handleChange = event => {
        setFormData({
          name: event.target.name,
          value: event.target.value,
        });
    }

    

    return(
        <div className='wrapper'>
            <div className='text-color'>
                <h1>Upload your caloric intake</h1>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <label>
                        <p>Food Item</p>
                        <input name="FoodItem" onChange={handleChange} value={formData.FoodItem || ''}/>
                        </label>
                    </fieldset>
                </form>
                <fieldset>
                    <button onClick={handleSubmit}>Submit</button>
                </fieldset>
            </div>
            <div>
            {!submitting &&
                <div>You just consumed {soFar} calories!</div>}
            </div>
        </div>
       
    )
};

export default CalorieCounter;