import React, { useReducer, useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { getUserSavedRecipe } from '../../firebase/database';
import './SavedRecipes.css';

const SavedRecipes = () => {
    const { currentUser, userLoggedIn } = useAuth();
    var contributor_id= '1234';
    if(userLoggedIn){
        contributor_id = currentUser.uid;
    }
    const navigate = useNavigate();
    var [recipes, setRecipes] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {
                if (userLoggedIn) {
                    const fetchedRecipes = await getUserSavedRecipe(contributor_id);
                    setRecipes(fetchedRecipes.map(res => res));
                    console.log(fetchedRecipes);
                    console.log(recipes);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
        fetchData();
    }, [userLoggedIn, contributor_id]);



    return(
        <div className='wrapper'>
            <div className='background-photo-page'>
            <p className='text-color'>Check out your saved recipes below to revisit old favorites!</p>
            {
                recipes.slice(1).map((recipe, index) => (
                    <ul key={index}>  
                        {recipe? (
                            <li>
                            <a href={`http://localhost:5173/recipe/${recipe}`}>{recipe}</a></li>
                            ) : (
                            <p>Error: No title found for recipe</p>
                        )}
                    </ul>
                ))
            }
            </div>
        </div>
    );
};

export default SavedRecipes;