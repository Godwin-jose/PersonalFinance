import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Avatar, Chip, Button, CardActions } from '@mui/material';
import axiosInstance from '../axiosConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state?.userName;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data for user:', userName);
        const response = await axiosInstance.post('https://personalfinance-go7i.onrender.com/admin/login', { userName });
        setUsers(response.data);
        console.log('Response data:', response.data); // Log the response data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (userName) {
      fetchData();
    }
  }, [userName]);

  useEffect(() => {
    console.log('Users State:', users);
  }, [users]);

  const deleteData = async (id) => {
    console.log('Deleting user with ID:', id);
    try {
      await axiosInstance.delete(`https://personalfinance-go7i.onrender.com/profile/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const editData = (id) => {
    console.log('Editing user with ID:', id);
    navigate('/edit', { state: { userName: userName, _id: id } });
  };

  const addItems = () => {
    console.log('Adding item for user:', userName);
    navigate('/add', { state: { userName: userName } });
  };

  return (
    <div className="Mar">
      <Grid container spacing={6} sx={{ py: 4, px: 6, justifyContent: 'center' }}>
        <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 1, fontWeight: 'bold' ,color:'#dddeed'}}>
            {userName}
          </Typography>
          <Avatar src={users[0]?.profilePicture} alt={userName} sx={{ width: 100, height: 100, mb: 2, mx: 'auto' }} />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
          <Button variant="contained" endIcon={<AddIcon />} onClick={addItems}>
            Add New Item
          </Button>
        </Grid>

        {users.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mb: 2,
                boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
                bgcolor: 'rgba(255, 255, 255, 0.2)', // White with partial transparency
                color: 'text.primary',
                backdropFilter: 'blur(5px)', // Apply the blur effect
                borderRadius: 2 // Add border radius
              }}
            >
              <CardContent>
                <Chip label="Transaction Category" sx={{ mb: 1, bgcolor: '#121db8', color: '#000', fontWeight: 'bold' }} />
                <Typography variant="body1" component="p" sx={{ color: '#dddeed', mb: 1, fontWeight: 'bold'  }}>
                  {user.category}
                </Typography>
                <Chip label="Transaction Amount" sx={{ mb: 1, bgcolor: '#121db8', color: '#000', fontWeight: 'bold' }} />
                <Typography variant="body1" component="p" sx={{ color: '#dddeed', mb: 1 , fontWeight: 'bold' }}>
                  {user.amount}
                </Typography>
                <Chip label="Transaction Description" sx={{ mb: 1, bgcolor: '#121db8', color: '#000', fontWeight: 'bold' }} />
                <Typography variant="body1" component="p" sx={{ color: '#dddeed', mb: 1, fontWeight: 'bold'  }}>
                  {user.description}
                </Typography>
                <Chip label="Transaction Date" sx={{ mb: 1, bgcolor: '#121db8', color: '#000', fontWeight: 'bold' }} />
                <Typography variant="body1" component="p" sx={{ color: '#dddeed', mb: 1, fontWeight: 'bold'  }}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </Typography>
                <Chip label="Last Updated" sx={{ mb: 1, bgcolor: '#121db8', color: '#000', fontWeight: 'bold' }} />
                <Typography variant="body1" component="p" sx={{ color: '#dddeed' , fontWeight: 'bold' }}>
                  {new Date(user.updatedAt).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button size="small" variant="contained" color="primary" sx={{ mr: 2 }} onClick={() => editData(user._id)}>
                  Edit Category
                </Button>
                <Button size="small" variant="contained" color="secondary" onClick={() => deleteData(user._id)}>
                  Delete Transaction
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserDashboard;
