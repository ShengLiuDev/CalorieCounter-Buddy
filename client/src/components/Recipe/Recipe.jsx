import React, { useReducer, useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { writeUserSavedRecipe } from '../../firebase/database';
//import axios from 'axios'; 


const Recipe = () => {
    const {name} = useParams();
    console.log(name);
    //const [recipe, setRecipe] = useState(null);
    const recipe = {
        title: "Cake", 
        description: "Delicious chocolate cake",
        ingredients: "flour", 
        minutes: 60, 
        steps: "bake in oven"
    }
    const { currentUser, userLoggedIn } = useAuth();

    /*useEffect(() => {
        // Function to fetch recipe by name from the backend
        const fetchRecipe = async () => {
            try {
                //const response = await axios.get(`http://localhost:3001/api/recipes/search/${name}`);
                //console.log(response.data);
                //setRecipe(response.data); // Set the fetched recipe data in the state
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        // Call the fetchRecipe function
        fetchRecipe();
    }, []); // Empty dependency array to ensure the effect runs only once*/


    var contributor_id= '1234';

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
    }


    return (
        <div>
            {/* Render the recipe data */}
            {recipe && (
                <div>
                    <h2>{recipe.title}</h2>
                    <p>{recipe.description}</p>
                    <p>{recipe.minutes}</p>
                    <div>
                        <button onClick={handleSave}>Save Recipe</button>
                    </div>
                </div>
                
            )}
        </div>
    );

};

export default Recipe;