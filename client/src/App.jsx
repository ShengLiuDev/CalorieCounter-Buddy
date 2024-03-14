import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login/Login"
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Navbar from './components/Navbar/Navbar';
import NotFound from './components/NotFound/NotFound';


const App = () => {

  // const [token, setToken] = useState(); //token is var for current state, setToken is func to update state

  // if(!token) {
  //   return <Home setToken={setToken} />
  // }

  return(
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element = {<Login />}></Route>
        <Route path = "/" element={<Home />}></Route>
        <Route path= "/signup" element={<Signup />}></Route>
        <Route component={NotFound} />
      </Routes>
    </AuthProvider>
  );
}

export default App