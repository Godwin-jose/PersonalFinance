import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    
    <div>
      <Box>
        <AppBar>
            <Toolbar>
                <Typography variant='h6' sx={{ flexGrow: 1 }}>Income Management</Typography>&nbsp;
                <Button variant='contained' color='success'><Link to={'/login'} style={{textDecoration: "none", color:"white"}}>Login</Link></Button>&nbsp;&nbsp;
                <Button variant='contained' color='success'><Link to={'/signup'} style={{textDecoration: "none", color:"white"}}>Sign Up</Link></Button>
            </Toolbar>
        </AppBar>
      </Box>
      <br /><br /><br />
    </div>
  )
}

export default Navbar
