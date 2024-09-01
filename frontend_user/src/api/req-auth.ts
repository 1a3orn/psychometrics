import axios from "axios";
import { Result } from "../shared-automatic";

export type AuthResponse = Result<{ token: string }>;

export const loginClient = axios.create({
  baseURL: "/api/auth",
});

export const postLogin = async (username: string, password: string, type = "LOCAL") => {
  const response = await loginClient.post<AuthResponse>("/login", { username, password, type });
  return response.data;
};

export const postSignup = async (username: string, password: string, email: string, type = "LOCAL") => {
  const response = await loginClient.post<AuthResponse>("/signup", { username, password, type, email });
  return response.data;
};

export const postLogout = async () => {
  const response = await loginClient.post<Result<{ success: boolean }>>("/logout");
  return response.data;
};
