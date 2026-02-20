import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');

    if (token) {
        if (role === 'admin') {
            config.headers.atoken = token;
            console.log("API Request - Admin Token Set:", token); // Debug log
        } else if (role === 'doctor') {
            config.headers.dtoken = token;
        } else {
            config.headers.token = token;
        }
    }
    return config;
});

export default api;
