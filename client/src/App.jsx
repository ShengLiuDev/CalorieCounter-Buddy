import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login/Login"
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
//import Profile from './components/Profile/Profile';
import Navbar from './components/Navbar/Navbar';
import UploadRecipe from './components/UploadRecipe/UploadRecipe';
import NotFound from './components/NotFound/NotFound';
import Popular from './components/Popular/Popular';
import CalorieCounter from './components/CalorieCounter/CalorieCounter';


const App = () => {

  return(
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element = {<Login />}></Route>
        {/* <Route path="/profile" element = {<Profile />}></Route> */}
        <Route path= "/signup" element={<Signup />}></Route>
        <Route path= "/" element={<Home />}></Route>
        <Route path="/upload-recipe" element={<UploadRecipe />}></Route>
        <Route path="/popular" element={<Popular />}></Route> 
        <Route path="/calorie-counter" element={<CalorieCounter/>}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App