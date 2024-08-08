import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    conpass: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.conpass) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axiosInstance.post('/signup', formData);
      console.log(response.data);
      alert('Signup successful');
      navigate('/login'); // Navigate to the login page after success
    } catch (error) {
      console.error('Error during signup:', error);
      // Display error message to the user
      alert('An error occurred during signup');
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        backgroundColor: '#f5f5f5' // Light grey background
      }}
    >
      <Container maxWidth="xs">
        <Box 
          sx={{ 
            padding: 3, 
            borderRadius: 2, 
            boxShadow: 3, 
            backgroundColor: 'white'
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              name="conpass"
              value={formData.conpass}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Sign Up
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
