import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Avatar, Chip, Button } from '@mui/material';
import axiosInstance from '../axiosConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state?.userName;
  console.log("Hello")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post('http://localhost:3000/admin/login', { userName });
        setUsers(response.data);
        console.log(response.data); // Log the response data
      } catch (error) {
        console.log(error);
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
    console.log(id);
    await axiosInstance.delete(`http://localhost:3000/profile/${id}`);
    window.location.reload();
  };
  const editData=(id)=>{
    navigate('/edit', { state: { userName:userName,_id:id} });
  }

  const addItems = () => {
    console.log(userName);
    navigate('/add', { state: { userName: userName } });
  };

  return (
    <Grid container spacing={2} sx={{ py: 4, px: 6 }}>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" sx={{ mb: 1, fontWeight: 'bold' }}>
          {userName}
        </Typography>
        <Avatar src={users[0]?.profilePicture} alt={userName} sx={{ width: 100, height: 100, mb: 2 }} />
      </Grid>
      <Button variant="contained" endIcon={<AddIcon />} onClick={addItems}>
        Add New Item
      </Button>

      {users.map((user, index) => (
        <Grid item xs={12} key={index}>
          <Card sx={{ mb: 2, boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Chip label="Transaction Category" color="primary" sx={{ mb: 1, bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }} />
                  <Typography variant="body1" component="p" sx={{ color: 'text.secondary' }}>
                    {user.category}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Chip label="Transaction Amount" color="secondary" sx={{ mb: 1, bgcolor: '#d32f2f', color: 'white', fontWeight: 'bold' }} />
                  <Typography variant="body1" component="p" sx={{ color: 'text.secondary' }}>
                    {user.amount}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Chip label="Transaction Description" color="primary" sx={{ mb: 1, bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }} />
                  <Typography variant="body1" component="p" sx={{ color: 'text.secondary' }}>
                    {user.description}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Chip label="Transaction Date" color="secondary" sx={{ mb: 1, bgcolor: '#d32f2f', color: 'white', fontWeight: 'bold' }} />
                  <Typography variant="body1" component="p" sx={{ color: 'text.secondary' }}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Chip label="Last Updated" color="primary" sx={{ mb: 1, bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }} />
                  <Typography variant="body1" component="p" sx={{ color: 'text.secondary' }}>
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6} container justifyContent="flex-end" alignItems="center">
                  <Button variant="outlined" color="primary" sx={{ mr: 2, py: 1, px: 3, border: '1px solid #1976d2', borderRadius: 0 }} onClick={() => editData(user._id)} >
                    Edit Category
                  </Button>
                  <Button variant="outlined" color="secondary" sx={{ py: 1, px: 3, border: '1px solid #d32f2f', borderRadius: 0 }} onClick={() => deleteData(user._id)}>
                    Delete Transaction
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserDashboard;
