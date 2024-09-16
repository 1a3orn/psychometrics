import axios from "axios";
import { Result } from "../shared-automatic";

export const commonClient = axios.create({
  baseURL: "/api/common",
});

export const postGetResetPasswordLink = async (username: string, email: string) => {
  const response = await commonClient.post<Result<{ message: string }>>("/reset-password-link", { username, email });
  return response.data;
};

export const postResetPassword = async (username: string, resetCode: string, newPassword: string) => {
  const response = await commonClient.post<Result<{ message: string }>>("/reset-password", {
    username,
    resetCode,
    newPassword,
  });
  return response.data;
};
