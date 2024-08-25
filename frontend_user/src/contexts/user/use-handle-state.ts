import { useState, useCallback, useEffect } from "react";

import { LoginState, UserContextType } from "./types";

import { login as loginApi, signup as signupApi } from "../../api";

export const USER_TOKEN_KEY = "user_token";

export const useHandleState = (): UserContextType => {
  const [state, setState] = useState<LoginState>({ type: "LOADING" });

  // Use useEffect to check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem(USER_TOKEN_KEY);
    if (token) {
      setState({ type: "LOGGED_IN", username: "", token });
    } else {
      setState({ type: "NOT_LOGGED_IN" });
    }
  }, []);

  const signup = useCallback(async (username: string, password: string, email: string, type: string = "LOCAL") => {
    const data = await signupApi(username, password, email, type);

    if (data.token) {
      localStorage.setItem(USER_TOKEN_KEY, data.token);
      setState({ type: "LOGGED_IN", username, token: data.token });
      return { success: true as true };
    }
    return { success: false as false, message: `Failed signup` };
  }, []);

  const login = useCallback(async (username: string, password: string, type: string = "LOCAL") => {
    const data = await loginApi(username, password, type);

    if (data.token) {
      localStorage.setItem(USER_TOKEN_KEY, data.token);
      setState({ type: "LOGGED_IN", username, token: data.token });
      return { success: true as true };
    }
    return { success: false as false, message: `Failed signup` };
  }, []);

  const logout = async () => {
    localStorage.removeItem(USER_TOKEN_KEY);
    setState({ type: "NOT_LOGGED_IN" });
  };

  return { state, login, signup, logout };
};
