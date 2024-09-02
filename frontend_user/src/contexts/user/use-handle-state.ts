import { useState, useCallback, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { LoginState, UserContextType } from "./types";
import { ResultSuccess } from "../../shared-automatic";

import { postLogin, postSignup, postLogout } from "../../api";

export const USER_TOKEN_KEY = "user_token";

export const useHandleState = (): UserContextType => {
  const [state, setState] = useState<LoginState>({ type: "LOADING" });

  // Use useEffect to check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem(USER_TOKEN_KEY);
    if (token) {
      try {
        const decoded = jwtDecode(token) as any;
        if (decoded && typeof decoded !== "string" && typeof decoded === "object") {
          setState({ type: "LOGGED_IN", username: decoded.username, token });
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      setState({ type: "NOT_LOGGED_IN" });
    }
  }, []);

  const handleSetLoggedIn = useCallback((result: ResultSuccess<{ token: string }>, username: string) => {
    const { token } = result.value;
    localStorage.setItem(USER_TOKEN_KEY, token);
    setState({ type: "LOGGED_IN", username, token });
    return result;
  }, []);

  const signup = useCallback(async (username: string, password: string, email: string, type: string = "LOCAL") => {
    const data = await postSignup(username, password, email, type);
    if (data.success) handleSetLoggedIn(data, username);
    return data;
  }, []);

  const login = useCallback(async (username: string, password: string, type: string = "LOCAL") => {
    const data = await postLogin(username, password, type);
    if (data.success) return handleSetLoggedIn(data, username);
    return data;
  }, []);

  const loginAsGuest = useCallback(async () => {
    localStorage.removeItem(USER_TOKEN_KEY);
    setState({ type: "GUEST" });
  }, []);

  const logout = async () => {
    localStorage.removeItem(USER_TOKEN_KEY);
    postLogout().finally(() => {
      setState({ type: "NOT_LOGGED_IN" });
    });
  };

  return { state, login, signup, logout, loginAsGuest };
};
