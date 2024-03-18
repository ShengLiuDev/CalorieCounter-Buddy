import React, { useReducer, useState } from 'react';
import './UploadRecipe.css'


function UploadRecipe() {

    const formReducer = (state, event) => {
        if(event.reset) {
            return {
              instructions: '',
              ingredients: '',
              name: '',
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

    return( 
        <div className='wrapper'>
            <h1>Submit Your Recipe Idea Here!</h1>
            {submitting &&
                <div>Submtting Form...</div>}
            <form onSubmit={handleSubmit}>
            <fieldset>
                <label>
                    <p>Name of Recipe</p>
                    <input name="name" onChange={handleChange} value={formData.name || ''}/>
                </label>
            </fieldset>
            <fieldset>
                <label>
                    <p>List of Ingredients</p>
                    <input name="ingredients" onChange={handleChange} value={formData.ingredients || ''}/>
                </label>
            </fieldset>
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
    );
}

export default UploadRecipe;