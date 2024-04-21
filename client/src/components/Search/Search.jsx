import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios'; 
import './Search.css';

const Search = () => {

    return(
        <div className='wrapper'>
            <form>
            <p> Search recipes </p>
            <input name="search"/>
            <button>Search</button>
            </form>
        </div>
    )
};

export default Search;