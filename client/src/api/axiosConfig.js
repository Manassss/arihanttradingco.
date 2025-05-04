import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5002/api', // or your port
  headers: { 'Content-Type': 'application/json' }
});

// Attach token if present
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;