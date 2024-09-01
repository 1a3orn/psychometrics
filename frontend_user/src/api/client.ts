import axios from "axios";

import { Result } from "../shared-automatic";
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

    const handleFailure = () => {
      console.log("handleFailure", error.response.data);
      localStorage.removeItem(USER_TOKEN_KEY);
      window.location.href = "/login";
      return Promise.resolve();
    };

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post<Result<{ token: string }>>("/api/auth/refresh");
        if (response.data.success) {
          const newToken = response.data.value.token;
          localStorage.setItem(USER_TOKEN_KEY, newToken);
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return client(originalRequest);
        } else {
          return handleFailure();
        }
      } catch (refreshError) {
        return handleFailure();
      }
    }
    return Promise.reject(error);
  }
);
