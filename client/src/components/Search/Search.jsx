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
    const [pageNumber, setPageNumber] = useState(1);
    useEffect(() => {
        makeSearchQuery();
    }, [pageNumber])

    const makeSearchQuery = async (e) => {
        const updatedFormData = {
            ...formData
        }
        if (updatedFormData.searchText == undefined) {
            return;
        }
        const searchResponse = await axios.get('http://localhost:3001/api/recipes/search', {
            params: {
                recipename: updatedFormData.searchText,
                page: pageNumber
            }
        })
        setSearchResults(searchResponse.data.recipes.map(res => res));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPageNumber(1);
        makeSearchQuery();
    }

    const handleChange = event => {
        setFormData({
          name: event.target.name,
          value: event.target.value,
        });
    }

    const turnPage = (pagesTurned) => {
        if (pageNumber > 1 || pagesTurned > 0) {
            setPageNumber(pageNumber + pagesTurned);
        }
    }

    return(
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
            <p className='text-color'> Search recipes </p>
            <input name="searchText" onChange={handleChange} value={formData.searchText || ''}/>
            <button type="submit" className='search-button'>Search</button>
            </form>
            <div className='searchResults'>
                {
                    searchResults.map(result => <div key={result.title}>
                        <a href={`http://localhost:5173/recipe/${result.title}`}>{result.title}</a>
                        <p>{result.description}</p>
                        </div>)
                }
            </div>
            <button type="button" onClick={() => turnPage(-1)} className='turn-buttons'>{'<'} Prev</button>
            {pageNumber}
            <button type="button" onClick={() => turnPage(1)} className='turn-buttons'>Next {'>'}</button>
        </div>
    )
};

export default Search;