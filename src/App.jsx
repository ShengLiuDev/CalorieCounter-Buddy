import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/Login/Login"
import Home from './components/Home/Home';

const App = () => {

  const [token, setToken] = useState(); //token is var for current state, setToken is func to update state

  if(!token) {
    return <Login setToken={setToken} />
  }

  return(
  <div>
  <h1>The Home Page</h1>
  <BrowserRouter>
    <Routes>
      <Route path = "/home" element={<Home />}>
      </Route>
      </Routes>
  </BrowserRouter>
  </div> 
  );
}

export default App