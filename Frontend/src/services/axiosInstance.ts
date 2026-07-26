// services/axiosInstance.ts
import axios from 'axios';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://focus-flow.somee.com/api',
  timeout: 10000,
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Global response error handling – logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      } else {
        redirect('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
