import React, { useReducer, useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { writeUserSavedRecipe, writeUserCalorieData } from '../../firebase/database';
import axios from 'axios'; 
import './Recipe.css';


const Recipe = () => {
    const {name} = useParams();
    console.log(name);
    const [recipe, setRecipe] = useState(null);
    /*const recipe = {
        title: "Cake", 
        description: "Delicious chocolate cake",
        ingredients: "flour", 
        minutes: 60, 
        steps: "bake in oven"
    }*/
    const { currentUser, userLoggedIn } = useAuth();

    useEffect(() => {
        // Function to fetch recipe by name from the backend
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/recipes/${name}`);
                console.log(response.data);
                setRecipe(response.data); // Set the fetched recipe data in the state
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        // Call the fetchRecipe function
        fetchRecipe();
    }, []); // Empty dependency array to ensure the effect runs only once


    var contributor_id= '1234';
    const [saving, setSaving] = useState(false);
    const [adding, setAdding] = useState(false);

    if(userLoggedIn){
        contributor_id = currentUser.uid;
    }

    const navigate = useNavigate();
    const handleSave = async (e) => {
        e.preventDefault();

        if (!userLoggedIn) {
            // If user is not logged in, redirect to the login page
            navigate('/login') // Change '/login' to the path of your login page
            return; // Exit the function to prevent further execution
        }

        await writeUserSavedRecipe(contributor_id, recipe.title);

        setSaving(true);

        setTimeout(() => {
            setSaving(false);
          }, 3000)
    }

    const handleConsume = async (e) => {
        e.preventDefault();

        if(!userLoggedIn){
             // If user is not logged in, redirect to the login page
             navigate('/login') // Change '/login' to the path of your login page
             return; // Exit the function to prevent further execution
        }

        await writeUserCalorieData(contributor_id, recipe.nutritionalInformation.calories);

        setAdding(true);

        setTimeout(() => {
            setAdding(false);
          }, 3000)
    }


    return (
        <div className='wrapper'>
            {/* Render the recipe data */}
            {recipe && (
                <div>
                    <h2 className='text-headings'>{recipe.title}</h2>
                    <p>{recipe.description}</p>
                    <p className='text-headings'>Nutritional Information: </p>
                    <ul>
                        <li>Calories: {recipe.nutritionalInformation.calories}</li>
                        <li>Fat: {recipe.nutritionalInformation.fat}</li>
                        <li>Carbohydrates: {recipe.nutritionalInformation.carbohydrates}</li>
                        <li>Protein: {recipe.nutritionalInformation.protein}</li>
                    </ul>
                    <p>Time to cook in minutes: {recipe.minutes}</p> 
                    <p className='text-headings'>Ingredients: </p>
                    <ul>
                        {recipe.ingredients.map(ingred =>
                            <li>{ingred.name}</li>
                        )}
                    </ul>
                    <p className='text-headings'>Cooking Instructions: </p>
                    <ol>
                        {recipe.steps.map(step =>
                            <li>{step}</li>
                        )}
                    </ol>
                    <div>
                        <button onClick={handleSave} className='save-buttons'>Save Recipe</button>
                    </div>
                    <div>
                        <button onClick={handleConsume} className='add-button'>Add to my Calorie Count!</button>
                    </div>
                    <div>
                        {saving && <p className='update-text'>Saved!</p>}
                    </div>
                    <div>
                        {adding && <p className='update-text'>Added to Calorie Count!</p>}
                    </div>
                </div>
                
            )}
        </div>
    );

};

export default Recipe;