import React, { useReducer, useState } from 'react';
import './UploadRecipe.css'


function UploadRecipe() {

    const [inputFields, setInputFields] = useState([
        {ingredients: '', quantity: '', measurement: ''}
    ]);

    const formReducer = (state, event) => {
        if(event.reset) {
            return {
              recipename: '',
              instructions: '',
              inputFields,
              'public': false,
            }
          }
        return {
          ...state,
          [event.name]: event.value
        }
    }

    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = event => {
        event.preventDefault();
        console.log(formData);
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

     const addFields = () => {
        let newfield = {ingredients: '', quantity: '', measurement: ''}
        setInputFields([...inputFields, newfield])
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
                    <input name="recipename" onChange={handleChange} value={formData.recipename || ''}/>
                </label>
            </fieldset>
            <fieldset>
                <div>
                    {
                        inputFields.map((input, index) => {
                            return(
                                <div key = {index}>
                                    <p>Ingredient Name</p>
                                    <input name="ingredients" onChange={event => handleFormChange(index, event)} value={input.ingredients || ''}/>
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
            <button onClick={addFields}>Add More..</button>
            <fieldset>
                <label>
                    <p>Instructions</p>
                    <input name="instructions" onChange={handleChange} value={formData.instructions || ''}/>
                </label>
            </fieldset>
            <fieldset>
                <label>
                    <p>Make Recipe Public?</p>
                    <input type="checkbox" name="public" onChange={handleChange} checked={formData['public'] || false}/>
                </label>
            </fieldset>
            <button type="submit">Submit</button>
            </form>
            </div>
        </div>
    );
}

export default UploadRecipe;