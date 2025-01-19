import axios from 'axios';

const API_URL = 'https://ecommerce-backend-olive-ten.vercel.app/api/auth';

export const signup = (data) => axios.post(`${API_URL}/signup`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);


