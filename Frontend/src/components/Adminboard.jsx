import React, { useEffect, useState } from 'react';
import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Grid, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axiosInstance from '../axiosConfig';
import '../styles/Adminboard.css'; // Import the CSS file

const Adminboard = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const val = location.state?.val;
  const navigate = useNavigate();

  const Dashboard = async (userName) => {
    try {
      navigate('/dashboard', { state: { userName: userName } });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    if (val === '(._.)') {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get('/admin/users'); // Replace with your API endpoint
          setUsers(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [val]);

  const deleteUser = async (id) => {
    try {
      await axiosInstance.delete(`/profile/user/${id}`);
      console.log("Button pressed");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (val !== '(._.)') {
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
          color: 'white',
          textAlign: 'center',
          p: 2,
        }}
      >
        <Typography variant="h4" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', p: 2, borderRadius: 2 }}>
          Access Denied
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundImage: 'url(/path/to/your/background-image.jpg)', // Add your background image URL here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        minHeight: '100vh',
        p: 2, // Add padding if needed
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, position: 'relative', zIndex: 2 }}>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            mb: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // White background with lower opacity for translucency
            backdropFilter: 'blur(10px)', // Optional: add blur effect
            position: 'relative', // Ensure it's positioned correctly
            width: '100%',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography variant="body1">
            Here you can manage users and view reports.
          </Typography>
        </Paper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.7)', // White background with lower opacity for translucency
                backdropFilter: 'blur(10px)', // Optional: add blur effect
              }}
            >
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                        <Typography variant="h5" gutterBottom>
                          Email
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                        <Typography variant="h5" gutterBottom>
                          Username
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                        <Typography variant="h5" gutterBottom>
                          Action
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell component="th" scope="row">
                          {user.email}
                        </TableCell>
                        <TableCell align="right">
                          {user.userName}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => { Dashboard(user.userName) }}
                            sx={{ m: 1 }}
                          >
                            View Dashboard
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            startIcon={<DeleteForeverIcon />}
                            onClick={() => { deleteUser(user._id) }}
                            sx={{ m: 1 }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Adminboard;
