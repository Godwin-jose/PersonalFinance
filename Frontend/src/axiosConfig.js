import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://personalfinance-go7i.onrender.com', // Replace with your API base URL
  
});

export default axiosInstance;
