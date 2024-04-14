import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios'; 
import './CalorieCounter.css'

function CalorieCounter() {

    const formReducer = (state, event) => {
        if(event.reset) {
            return {
              foodItem: ''
            }
          }
        return {
          ...state,
          [event.name]: event.value
        }
    }

    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedFormData = {
            ...formData,
            today: new Date()
        };
        console.log(updatedFormData)

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
                        <input name="foodItem" onChange={handleChange} value={formData.foodItem || ''}/>
                        </label>
                    </fieldset>
                </form>
                <fieldset>
                    <button onClick={handleSubmit}>Submit</button>
                </fieldset>
            </div>
            <div>
            {!submitting &&
                <div>You have consumed X calories so far today!</div>}
            </div>
        </div>
       
    )
};

export default CalorieCounter;