import axios from "axios";

import { USER_TOKEN_KEY } from "../contexts/user/use-handle-state";

export const client = axios.create({
  baseURL: "/api",
});

client.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(USER_TOKEN_KEY);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post("/api/auth/refresh");
        const newToken = response.data.token;
        localStorage.setItem(USER_TOKEN_KEY, newToken);
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return client(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
