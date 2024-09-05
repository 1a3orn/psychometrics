import { useState, useCallback, useEffect } from "react";

import { LoginState, UserContextType } from "./types";
import { useTokenManagement } from "./use-token-management";
import { ResultSuccess } from "../../shared-automatic";

import { postLogin, postSignup, postLogout } from "../../api";

export const USER_TOKEN_KEY = "user_token";

const NOT_LOGGED_IN: LoginState = { type: "NOT_LOGGED_IN" };

/* State Transition Diagram
 *
 * LOADING -> [NOT_LOGGED_IN, LOGGED_IN]
 * NOT_LOGGED_IN -> [GUEST, LOGGED_IN]
 * LOGGED_IN -> [NOT_LOGGED_IN]
 * GUEST -> [NOT_LOGGED_IN]
 */

export const useHandleState = (): UserContextType => {
  const { validateToken, getToken, setToken, removeToken } = useTokenManagement();
  const [state, setState] = useState<LoginState>({ type: "LOADING" });

  // Use useEffect to check if the user is logged in
  // We do this just once, when the component is mounted
  useEffect(() => {
    if (state.type === "LOADING") {
      const token = getToken();
      setState(token ? validateToken(token) : NOT_LOGGED_IN);
    }
  }, [state, validateToken, getToken]);

  const handleSetLoggedIn = useCallback(
    (result: ResultSuccess<{ token: string }>, username: string) => {
      setToken(result.value.token);
      setState({ type: "LOGGED_IN", username, token: result.value.token });
      return result;
    },
    [setToken, setState]
  );

  const signup = useCallback(
    async (username: string, password: string, email: string, type: string = "LOCAL") => {
      const data = await postSignup(username, password, email, type);
      if (data.success) handleSetLoggedIn(data, username);
      return data;
    },
    [handleSetLoggedIn]
  );

  const login = useCallback(
    async (username: string, password: string, type: string = "LOCAL") => {
      const data = await postLogin(username, password, type);
      if (data.success) return handleSetLoggedIn(data, username);
      return data;
    },
    [handleSetLoggedIn]
  );

  const loginAsGuest = useCallback(async () => {
    removeToken();
    setState({ type: "GUEST" });
  }, [removeToken, setState]);

  const logout = useCallback(async () => {
    removeToken();
    postLogout().finally(() => {
      setState(NOT_LOGGED_IN);
    });
  }, [removeToken, setState]);

  return { state, login, signup, logout, loginAsGuest };
};
