import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';




const Adminboard = () => {
  const [users, setUsers] = useState([]);
  const navigate=useNavigate();
 


  const Dashboard = async (userName) => {
    try {
     
      
      navigate('/dashboard', { state: { userName:userName } });
      // Handle successful response, e.g., navigate to a different page or update state
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Display error message to the user
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/admin/users'); // Replace with your API endpoint
        setUsers(response.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const deleteUser=async (id)=>{
   try {
    const data=await axiosInstance.delete(`/profile/user/${id}`);
    await axiosInstance.delete(`http://localhost:3000/profile/${id}`);
    console.log(data);
    console.log("Button pressed")
    window.location.reload();
   } catch (error) {
    console.log(error)
   }

  }

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography variant="body1">
            Here you can manage users and view reports.
          </Typography>
        </Paper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="h5" gutterBottom>
                          Email
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="h5" gutterBottom>
                          Username
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="h5" gutterBottom>
                          Action
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((val, id) => {
                      return (
                        <TableRow key={id}>
                          <TableCell>{val.email}</TableCell>
                          <TableCell align="right">{val.userName}</TableCell>
                          <TableCell align="right">
                            <Button variant="outlined" color="primary" onClick={()=>{Dashboard(val.userName)}}>
                              View Dashboard
                            </Button>
                          </TableCell>
                          <TableCell>
                          <Button variant="outlined" startIcon={<DeleteForeverIcon/>} onClick={()=>{deleteUser(val._id)}}>
                                      Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Adminboard;