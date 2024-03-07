import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="links">
            <Link to="/home">Home</Link>
            {/* <Link to="/account">Account Profile</Link>
            <Link to="/calories">Calorie Upload</Link> */}
        </div>
    </div>
  )
}

export default Navbar