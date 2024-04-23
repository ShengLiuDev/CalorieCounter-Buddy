import React, { useReducer, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'; 
import { useAuth } from '../../contexts/authContext';
import './UploadRecipe.css'

//function UploadRecipe()



const UploadRecipe = () => {

    const { currentUser, userLoggedIn} = useAuth();

    const [inputFields, setInputFields] = useState([
        {name: '', quantity: '', measurement: ''}
    ]);

    const[inputFields2, setInputFields2] = useState([
        {steps: ''}
    ]);

    const [inputFieldsTags, setInputFieldsTags] = useState([
        {tags: ''}
    ]);

    const formReducer = (state, event) => {
        if(event.reset) {
            return {
              title: '',
              inputFields,
              inputFields2,
              minutes: '', 
              description: '', 
              inputFieldsTags, 
            }
          }
        return {
          ...state,
          [event.name]: event.value
        }
    }

    const navigate = useNavigate();

    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const tagsArray = inputFieldsTags.map(tagObject => tagObject.tags);
        const nonEmptyTagsArray = tagsArray.filter(tag => tag.trim() !== '');

        const stepsArray = inputFields2.map(stepObject => stepObject.steps);
        const nonEmptyStepsArray = stepsArray.filter(step => step.trim() !== '');

        if (!userLoggedIn) {
            // If user is not logged in, redirect to the login page
            navigate('/login') // Change '/login' to the path of your login page
            return; // Exit the function to prevent further execution
        }
        
        var contributor_id= '1234';

        if(userLoggedIn){
            contributor_id = currentUser.uid;
        }

        const updatedFormData = {
            ...formData,
            ingredients: inputFields,
            steps: nonEmptyStepsArray, 
            tags: nonEmptyTagsArray,
            today: new Date(),
            contributor_id
        };
        
        //console.log(updatedFormData);
        const response = await axios.post('http://localhost:3001/api/recipes', updatedFormData);
        console.log(response.data);

        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
            setFormData({
                reset: true
              })
          }, 3000)
      }


    const handleChange = event => {
        const isCheckbox = event.target.type === 'checkbox';
        setFormData({
          name: event.target.name,
          value: isCheckbox ? event.target.checked : event.target.value,
        });
      }

      const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
     }

     const handleFormChange2 = (index, event) => {
        let data = [...inputFields2];
        data[index][event.target.name] = event.target.value;
        setInputFields2(data);
     }

     const handleFormChangeTags = (index, event) => {
        let data = [...inputFieldsTags];
        data[index][event.target.name] = event.target.value;
        setInputFieldsTags(data);
     }

     const addFields = (e) => {
        e.preventDefault();
        let newfield = {name: '', quantity: '', measurement: ''}
        setInputFields([...inputFields, newfield])
     }

     const addFields2 = (e) => {
        e.preventDefault();
        let newfield = {steps: ''}
        setInputFields2([...inputFields2, newfield])
     }

     const addFieldsTags = (e) => {
        e.preventDefault();
        let newfield = {tags: ''}
        setInputFieldsTags([...inputFieldsTags, newfield])
     }

    return( 
        <section className='wrapper'>
            <div /*className='background-photo-page'*/>
                <h1 className="recipe-header">Submit Your Recipe Idea Here!</h1>
                {submitting &&
                    <div>Submtting Form...</div>}
                <form onSubmit={handleSubmit} >
                <fieldset>
                    <label className="input-header">
                        <p>
                            Name of Recipe
                        </p>
                        <input name="title" onChange={handleChange} value={formData.title || ''} id="text"/>
                    </label>
                </fieldset>
                <fieldset>
                    <div>
                        {
                            inputFields.map((input, index) => {
                                return(
                                    <div key = {index}>
                                        <p className="input-header">Ingredient Name</p>
                                        <input name="name" onChange={event => handleFormChange(index, event)} value={input.name || ''} id="text"/>
                                        <p className="input-header">Quantity</p>
                                        <input name="quantity" onChange={event => handleFormChange(index, event)} value={input.quantity || ''} id="text"/>
                                        <p className="input-header">Unit of Measurement</p>
                                        <input name="measurement" onChange={event => handleFormChange(index, event)} value={input.measurement || ''} id="text"/>
                                    </div>
                                )
                            })
                        }    
                    </div>
                </fieldset>
                <button onClick={addFields} className='adding-buttons'>
                    <p className="input-header">
                        Add Other Ingredient..
                    </p>
                </button>
                <fieldset>
                    <div>
                        {
                            inputFields2.map((input, index) => {
                                return(
                                    <div key = {index}>
                                        <p className="input-header">Instructions</p>
                                        <input name="steps" onChange={event => handleFormChange2(index, event)} value={input.steps || ''} id="text"/>
                                    </div>
                                )
                            })
                        }    
                    </div>
                </fieldset>
                <button onClick={addFields2} className='adding-buttons'>
                        <p className="input-header">
                            Add Next Instruction
                        </p>
                </button>
                <fieldset>
                    <label className="input-header">
                        <p className="input-header">
                            Cooking Time (minutes)
                        </p>
                        <input type ="number" name="minutes" onChange={handleChange} value={formData.minutes || ''} id="text"/>
                    </label>
                </fieldset>
                <fieldset>
                    <label className="input-header">
                        <p>
                            Description of Recipe
                        </p>
                        <input name="description" onChange={handleChange} value={formData.description || ''} id="text"></input>
                    </label>
                </fieldset>
                <fieldset>
                    <div>
                        {
                            inputFieldsTags.map((input, index) => {
                                return(
                                    <div key = {index}>
                                        <p className="input-header">
                                            Add Relevant Tags
                                        </p>
                                        <input name="tags" onChange={event => handleFormChangeTags(index, event)} value={input.tags || ''} id="text"/>
                                    </div>
                                )
                            })
                        }    
                    </div>
                </fieldset>
                <button onClick={addFieldsTags} className='adding-buttons'>
                    <p className="input-header">
                        Add Another Tag
                    </p>
                </button>
                <fieldset>
                    <button onClick={handleSubmit} className='upload-submit-btn'>
                        <p className="input-header">
                            Submit
                        </p>
                    </button>
                </fieldset>
                </form>
            </div>
        </section>
    );
}

export default UploadRecipe;