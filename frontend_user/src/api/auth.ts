import { loginClient } from "./client";

export const login = async (username: string, password: string, type = "LOCAL") => {
  const response = await loginClient.post("/api/auth/login", { username, password, type });
  return response.data as { token: string };
};

export const signup = async (username: string, password: string, email: string, type = "LOCAL") => {
  const response = await loginClient.post("/api/auth/signup", { username, password, type, email });
  return response.data as { token: string };
};

export const logout = async () => {
  const response = await loginClient.post("/api/auth/logout");
  return response.data;
};
