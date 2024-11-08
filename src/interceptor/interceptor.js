
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' }
});


// check weather tokem is expired or not

const isTokenExpired = (token) => {
  if (!token) return true;

  const decoded = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000);

  return decoded.exp < currentTime;
};


//to set every api call to access token

api.interceptors.request.use(
  (config) => {
  
    const accessToken = localStorage.getItem('accessToken');
 
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }


    return config;
  },
  (error) => Promise.reject(error)
);


//To regenerate refresh token if it is already expired


api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      const userId = localStorage.getItem('userId')
    
      if (refreshToken) {
        try {
        
          const { data } = await axios.put('http://localhost:4000/api/auth/account', { userId: userId });

          localStorage.setItem('accessToken', data.accessToken);
       
          api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
       
          return api(originalRequest);
        } catch (refreshError) {
          console.error('Refresh token expired or invalid', refreshError);
          // Handle logout if the refresh token is invalid
          // localStorage.removeItem('accessToken');
          // localStorage.removeItem('refreshToken');
          localStorage.clear()
          window.location.href = '/Loginpage';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;

