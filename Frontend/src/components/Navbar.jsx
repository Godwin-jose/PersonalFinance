import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <div id="body">
    
      <br /><br /><br />
      <nav className="navbar">
        <div className="navbar-logo">IncomeApp</div>
        <div className="navbar-links">
        <Button>
            <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
          </Button>
          <Button color='success'>
            <Link to={'/login'} style={{ textDecoration: 'none', color: 'white' }}>Login</Link>
          </Button>&nbsp;&nbsp;
          <Button>
            <Link to={'/signup'} style={{ textDecoration: 'none', color: 'white' }}>Sign Up</Link>
          </Button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
