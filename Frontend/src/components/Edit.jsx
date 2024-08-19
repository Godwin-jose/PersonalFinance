import React, { useEffect, useState } from 'react';
import { Container, TextField, Typography, Button, Box } from '@mui/material';
import axiosInstance from '../axiosConfig';
import { useLocation, useNavigate } from 'react-router-dom';

const Userboard = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state?.userName;
  const id = location.state?._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`https://personalfinance-go7i.onrender.com/profile/${id}`);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.put(`https://personalfinance-go7i.onrender.com/profile/${id}`, {
        amount,
        category,
        description
      });
      alert("Data Updated");
      setAmount('');
      setCategory('');
      setDescription('');
      navigate('/dashboard', { state: { userName } });
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'transparent'
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Translucent white background
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 400,
          width: '100%'
        }}
      >
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
      </Box>
    </Container>
  );
};

export default Userboard;
