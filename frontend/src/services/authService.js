// frontend/src/services/authService.js
import axios from 'axios';

const API_URL = '/api/auth';

// Create axios instance with base config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor to add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const loginUser = async (email, password) => {
    const response = await api.post('/login', { email, password });
    return response.data;
};

export const registerUser = async (userData) => {
    const response = await api.post('/signup', userData);
    return response.data;
};

export const forgotPassword = async (email) => {
    const response = await api.post('/forgot-password', { email });
    return response.data;
};

export const resetPassword = async (token, newPassword) => {
    const response = await api.post('/reset-password', { token, newPassword });
    return response.data;
};

export const getUserProfile = async () => {
    const response = await api.get('/profile');
    return response.data.user;
};