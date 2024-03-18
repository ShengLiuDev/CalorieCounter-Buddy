import React from 'react'
import { Link } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="links">
            <Link to="/">Home</Link>
            <div className='linksLogin'>
              <Link to="/login">Login</Link>
            </div>
            <Link to="/upload-recipe">Upload Recipe</Link>
        </div>
    </div>
  )
}

export default Navbar