import React, { useState } from 'react';
import { Container, TextField, Typography, Button } from '@mui/material';
import axiosInstance from '../axiosConfig'; // Import your configured axios instance
import { useLocation, useNavigate } from 'react-router-dom';

const Userboard = () => {
  // State variables to store form data
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const navigate=useNavigate();
  const location = useLocation();
  const userName = location.state?.userName;
  
 
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
      console.log(userName);
      alert("Data Added");

      
      console.log(response.data); // Log the response data
      // Clear the form fields after submission
      setAmount('');
      setCategory('');
      setDate('');
      setDescription('');
      navigate('/dashboard', { state: { userName:userName } });
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };


  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      <Typography variant="body1">
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
    </Container>
  );
};

export default Userboard;
