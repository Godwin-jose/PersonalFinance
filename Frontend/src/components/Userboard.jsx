import React, { useState } from 'react';
import { Container, TextField, Typography, Button, Box } from '@mui/material';
import axiosInstance from '../axiosConfig'; // Import your configured axios instance
import { useLocation, useNavigate } from 'react-router-dom';

const Userboard = () => {
  // State variables to store form data
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state?.userName;
  const id = location.state?._id;

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axiosInstance.post('/profile', {
        userName,
        amount,
        category,
        description,
      });
      console.log("module");
      console.log(id);
      alert("Data Added");

      console.log(response.data); // Log the response data
      // Clear the form fields after submission
      setAmount('');
      setCategory('');
      setDescription('');
      navigate('/dashboard', { state: { userName: userName } });
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        backgroundImage: 'url(/path/to/your/background-image.jpg)', // Add your background image URL here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 2 }}>
        <Box 
          sx={{ 
            padding: 3, 
            borderRadius: 2, 
            boxShadow: 3, 
            backgroundColor: 'rgba(189, 229, 255, 0.7)', // White background with lower opacity for translucency
            backdropFilter: 'blur(10px)', // Optional: add blur effect
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            User Dashboard
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            Here you can manage your income and expenses.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Amount"
              fullWidth
              margin="normal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <TextField
              label="Category"
              fullWidth
              margin="normal"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Userboard;
