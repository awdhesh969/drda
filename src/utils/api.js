import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  // This automatically prefixes your requests, making them cleaner
  baseURL: '/api', 
});

// A request interceptor dynamically grabs the token from cookies 
// right before the request leaves, ensuring it's always up-to-date.
api.interceptors.request.use(
  (config) => {
    // Check if window is defined (ensures this runs only on the client-side)
    if (typeof window !== 'undefined') {
      // Grab the token from cookies instead of localStorage
      const token = Cookies.get('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;