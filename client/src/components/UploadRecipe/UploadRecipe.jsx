import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios'; 
import './UploadRecipe.css'


function UploadRecipe() {

    const [inputFields, setInputFields] = useState([
        {name: '', quantity: '', measurement: ''}
    ]);

    const[inputFields2, setInputFields2] = useState([
        {instructions: ''}
    ]);

    const formReducer = (state, event) => {
        if(event.reset) {
            return {
              title: '',
              inputFields,
              inputFields2,
            }
          }
        return {
          ...state,
          [event.name]: event.value
        }
    }

    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFormData = {
            ...formData,
            ingredients: inputFields,
            instructions: inputFields2
        };
        
        console.log(updatedFormData);
        const response = axios.post('http://localhost:3001/api/recipes', updatedFormData);
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

     const addFields = (e) => {
        e.preventDefault();
        let newfield = {ingredients: '', quantity: '', measurement: ''}
        setInputFields([...inputFields, newfield])
     }

     const addFields2 = (e) => {
        e.preventDefault();
        let newfield = {instructions: ''}
        setInputFields2([...inputFields2, newfield])
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
                                    <input name="instructions" onChange={event => handleFormChange2(index, event)} value={input.instructions || ''}/>
                                </div>
                            )
                        })
                    }    
                </div>
            </fieldset>
            <button onClick={addFields2}>Add Next Instruction</button>
            <button onClick={handleSubmit}>Submit</button>
            </form>
            </div>
        </div>
    );
}

export default UploadRecipe;