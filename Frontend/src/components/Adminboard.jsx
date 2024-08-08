import React, { useEffect, useState } from 'react';
import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axiosInstance from '../axiosConfig';
import '../styles/Adminboard.css'; // Import the CSS file

const Adminboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const Dashboard = async (userName) => {
    try {
      navigate('/dashboard', { state: { userName: userName } });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
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

  const deleteUser = async (id) => {
    try {
      const data = await axiosInstance.delete(`/profile/user/${id}`);
      await axiosInstance.delete(`http://localhost:3000/profile/${id}`);
      console.log(data);
      console.log("Button pressed");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container maxWidth="lg" className="container" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} className="paper" sx={{ p: 2, mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography variant="body1">
            Here you can manage users and view reports.
          </Typography>
        </Paper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={3} className="paper" sx={{ p: 2 }}>
              <TableContainer className="table-container">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="table-head-cell">
                        <Typography variant="h5" gutterBottom>
                          Email
                        </Typography>
                      </TableCell>
                      <TableCell align="right" className="table-head-cell">
                        <Typography variant="h5" gutterBottom>
                          Username
                        </Typography>
                      </TableCell>
                      <TableCell align="right" className="table-head-cell">
                        <Typography variant="h5" gutterBottom>
                          Action
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((val, id) => (
                      <TableRow key={id} className="table-row">
                        <TableCell component="th" scope="row" className="table-cell">
                          {val.email}
                        </TableCell>
                        <TableCell align="right" className="table-cell table-cell-align-right">
                          {val.userName}
                        </TableCell>
                        <TableCell align="right" className="table-cell table-cell-align-right">
                          <Button 
                            variant="outlined" 
                            color="primary" 
                            onClick={() => { Dashboard(val.userName) }}
                            className="view-dashboard-button"
                          >
                            View Dashboard
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outlined" 
                            startIcon={<DeleteForeverIcon />} 
                            onClick={() => { deleteUser(val._id) }}
                            className="delete-button"
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
    </div>
  );
};

export default Adminboard;
