import { Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Login = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/login', formData);
      console.log(response.data.message);
      if(response.data.message=="1"){
        navigate('/admin');
      }
      else{
      navigate('/dashboard', { state: { userName: formData.userName } });
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
    <div>
      <Container maxWidth="xs">
        <Typography variant="h4" gutterBottom>
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
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" align="center">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Typography>
      </Container>
    </div>
  );
};

export default Login;