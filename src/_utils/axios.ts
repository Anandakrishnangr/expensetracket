import axios from 'axios';
import { persistor } from '../redux/store';

// Define the logout function
const logout = () => {
  // Clear token and perform any additional cleanup
  localStorage.removeItem('token');
  persistor.purge(); //
  // Redirect to the login page or any other appropriate action
  window.location.href = '/login'; // Adjust the redirect path as needed
};

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.75:8000/', // Replace with your backend URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized errors
      logout();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
