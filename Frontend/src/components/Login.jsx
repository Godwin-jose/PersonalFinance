import { Box, Button, Container, TextField, Typography, Checkbox, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Login = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/login', formData);
      console.log(response.data.message);
      if(response.data.message === "1"){
        navigate('/admin');
      } else {
        navigate('/dashboard', { state: { userName: formData.userName} });
      } // Navigate to the dashboard or another route after success
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An unknown error occurred');
      }
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
            Login
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
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  name="rememberMe"
                />
              }
              label="Remember Me"
            />
            {error && (
              <Typography variant="body2" color="error" align="center">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>
          </form>
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
