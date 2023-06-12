import axios from 'axios';

const baseURL =
  process.env.REACT_APP_NODE_ENV === 'development'
    ? 'http://localhost:8080/'
    : process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
