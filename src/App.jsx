import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/Login/Login"
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Navbar from './components/Navbar/Navbar';

const App = () => {

  // const [token, setToken] = useState(); //token is var for current state, setToken is func to update state

  // if(!token) {
  //   return <Home setToken={setToken} />
  // }

  return(
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element = {<Login />}></Route>
        <Route path = "/home" element={<Home />}></Route>
        <Route path= "/signup" element={<Signup />}></Route>
      </Routes>
    </div> 
  );
}

export default App