import { useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { LoginState, DecodedToken } from "./types";

const USER_TOKEN_KEY = "user_token";
const NOT_LOGGED_IN: LoginState = { type: "NOT_LOGGED_IN" };

const getToken = () => localStorage.getItem(USER_TOKEN_KEY);
const setToken = (token: string) => localStorage.setItem(USER_TOKEN_KEY, token);
const removeToken = () => localStorage.removeItem(USER_TOKEN_KEY);

export const useTokenManagement = () => {
  const validateToken = useCallback((token: string): LoginState => {
    try {
      // Defensive coding here
      if (!token) return NOT_LOGGED_IN;

      if (typeof token !== "string") return NOT_LOGGED_IN;

      // Decode the token
      const decoded = jwtDecode<DecodedToken>(token);

      // if the token is expired, return NOT_LOGGED_IN
      if (decoded.exp < Date.now() / 1000) return NOT_LOGGED_IN;

      // Check that token has username
      if (!decoded.username) return NOT_LOGGED_IN;

      return { type: "LOGGED_IN", username: decoded.username, token };
    } catch (error) {
      console.error("Error decoding token:", error);
      return NOT_LOGGED_IN;
    }
  }, []);

  return { validateToken, getToken, setToken, removeToken };
};
