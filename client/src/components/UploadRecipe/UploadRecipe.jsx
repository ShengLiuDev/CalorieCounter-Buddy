import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios'; 
import './UploadRecipe.css'


function UploadRecipe() {

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
              inputFieldsTags
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
        const tagsArray = inputFieldsTags.map(tagObject => tagObject.tags);
        const nonEmptyTagsArray = tagsArray.filter(tag => tag.trim() !== '');

        const stepsArray = inputFields2.map(stepObject => stepObject.steps);
        const nonEmptyStepsArray = stepsArray.filter(step => step.trim() !== '');

        const updatedFormData = {
            ...formData,
            ingredients: inputFields,
            steps: nonEmptyStepsArray, 
            tags: nonEmptyTagsArray,
            today: new Date()
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
        <div className='wrapper'>
            <div className='text-color'>
            <h1>Submit Your Recipe Idea Here!</h1>
            {submitting &&
                <div>Submtting Form...</div>}
            <form onSubmit={handleSubmit}>
            <fieldset>
                <label>
                    <p>Name of Recipe</p>
                    <input name="title" onChange={handleChange} value={formData.title || ''}/>
                </label>
            </fieldset>
            <fieldset>
                <div>
                    {
                        inputFields.map((input, index) => {
                            return(
                                <div key = {index}>
                                    <p>Ingredient Name</p>
                                    <input name="name" onChange={event => handleFormChange(index, event)} value={input.name || ''}/>
                                    <p>Quantity</p>
                                    <input name="quantity" onChange={event => handleFormChange(index, event)} value={input.quantity || ''}/>
                                    <p>Unit of Measurement</p>
                                    <input name="measurement" onChange={event => handleFormChange(index, event)} value={input.measurement || ''}/>
                                </div>
                            )
                        })
                    }    
                </div>
            </fieldset>
            <button onClick={addFields}>Add Other Ingredient..</button>
            <fieldset>
                <div>
                    {
                        inputFields2.map((input, index) => {
                            return(
                                <div key = {index}>
                                    <p>Instruction</p>
                                    <input name="steps" onChange={event => handleFormChange2(index, event)} value={input.steps || ''}/>
                                </div>
                            )
                        })
                    }    
                </div>
            </fieldset>
            <button onClick={addFields2}>Add Next Instruction</button>
            <fieldset>
                <label>
                    <p>Cooking Time (minutes)</p>
                    <input type ="number" name="minutes" onChange={handleChange} value={formData.minutes || ''}/>
                </label>
            </fieldset>
            <fieldset>
                <label>
                    <p>Description of Recipe</p>
                    <input name="description" onChange={handleChange} value={formData.description || ''}></input>
                </label>
            </fieldset>
            <fieldset>
                <div>
                    {
                        inputFieldsTags.map((input, index) => {
                            return(
                                <div key = {index}>
                                    <p>Add Relevant Tags</p>
                                    <input name="tags" onChange={event => handleFormChangeTags(index, event)} value={input.tags || ''}/>
                                </div>
                            )
                        })
                    }    
                </div>
            </fieldset>
            <button onClick={addFieldsTags}>Add Another Tag</button>
            <fieldset>
                <button onClick={handleSubmit}>Submit</button>
            </fieldset>
            </form>
            </div>
        </div>
    );
}

export default UploadRecipe;