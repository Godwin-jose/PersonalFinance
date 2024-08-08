import React, { useEffect, useState } from 'react';
import { Container, TextField, Typography, Button } from '@mui/material';
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

  // Fetch data when component mounts or id changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:3000/profile/${id}`);
        // Assuming response.data is an array and the user data is the first object
        if (response.data.length > 0) {
          const user = response.data[0];
          setAmount(user.amount || '');
          setCategory(user.category || '');
          setDescription(user.description || '');
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      await axiosInstance.put(`http://localhost:3000/profile/${id}`, {
        amount,
        category,
        description
      });
      alert("Data Updated");

      // Clear the form fields after submission
      setAmount('');
      setCategory('');
      setDescription('');
      navigate('/dashboard', { state: { userName } });
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      <Typography variant="body1">
        Edit your data
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Userboard;
