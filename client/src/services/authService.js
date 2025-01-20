import axios from 'axios';

const API_URL = 'https://ecommerce-backend-l9kd.onrender.com/api/auth';

export const signup = (data) => axios.post(`${API_URL}/signup`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);


