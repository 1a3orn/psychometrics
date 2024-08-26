import axios from "axios";

export const loginClient = axios.create({
  baseURL: "/api/auth",
});

export const postLogin = async (username: string, password: string, type = "LOCAL") => {
  const response = await loginClient.post<{ token: string }>("/login", { username, password, type });
  return response.data;
};

export const postSignup = async (username: string, password: string, email: string, type = "LOCAL") => {
  const response = await loginClient.post<{ token: string }>("/signup", { username, password, type, email });
  return response.data;
};

export const postLogout = async () => {
  const response = await loginClient.post<{ success: boolean }>("/logout");
  return response.data;
};
