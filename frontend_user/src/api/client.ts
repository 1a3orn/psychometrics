import axios from 'axios';

import { USER_TOKEN_KEY } from '../contexts/user/use-handle-state';

export const client = axios.create({
    baseURL: '/',
});

client.interceptors.request.use(function (config) {
    const token = localStorage.getItem(USER_TOKEN_KEY);
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export const loginClient = axios.create({
    baseURL: '/',
});

export const commonClient = axios.create({
    baseURL: '/',
});



