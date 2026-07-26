import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: "http://focus-flow.somee.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
