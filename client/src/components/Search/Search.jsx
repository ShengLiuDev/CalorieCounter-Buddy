import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios'; 
import './Search.css';

const Search = () => {


    const formReducer = (state, event) => {
        if(event.reset) {
            return {
              SearchText: ''
            }
          }
        return {
          ...state,
          [event.name]: event.value
        }
    }
    const [formData, setFormData] = useReducer(formReducer, {});
    const [searchResults, setSearchResults] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedFormData = {
            ...formData
        };

        const searchResponse = await axios.get(`http://localhost:3001/api/recipes/search`, {
            params: {
                recipename: updatedFormData.searchText
            }
        })
        setSearchResults(searchResponse.data.recipes.map(res => res));
    }

    const handleChange = event => {
        setFormData({
          name: event.target.name,
          value: event.target.value,
        });
    }

    return(
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
            <p> Search recipes </p>
            <input name="searchText" onChange={handleChange}/>
            <button>Search</button>
            </form>
            <div className='searchResults'>
                {
                    searchResults.map(result => <div><a href={`http://localhost:5173/recipe/${result.title}`}>{result.title}</a></div>)
                }
            </div>
        </div>
    )
};

export default Search;