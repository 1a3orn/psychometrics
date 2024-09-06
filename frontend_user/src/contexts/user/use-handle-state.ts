import { useState, useCallback, useEffect } from "react";

import { postLogin, postSignup, postLogout } from "../../api";
import { Result } from "../../shared-automatic";

import { LoginState, UserContextType } from "./types";
import { useTokenManagement } from "./use-token-management";
import { useTokenManagementGuest } from "./use-token-management-guest";

const NOT_LOGGED_IN: LoginState = { type: "NOT_LOGGED_IN" };

/* Intended State Transition Diagram
 *
 * LOADING -> [NOT_LOGGED_IN, LOGGED_IN]
 * NOT_LOGGED_IN -> [GUEST, LOGGED_IN]
 * LOGGED_IN -> [NOT_LOGGED_IN]
 * GUEST -> [NOT_LOGGED_IN]
 */
export const useHandleState = (): UserContextType => {
  const { validateToken, getTokenAuth, setTokenAuth, removeTokenAuth } = useTokenManagement();

  const { getTokenGuest, setTokenGuest, removeTokenGuest } = useTokenManagementGuest();
  const [state, setState] = useState<LoginState>({ type: "LOADING" });

  // Use useEffect to check if the user is logged in
  // We do this just once, when the component is mounted
  useEffect(() => {
    if (state.type === "LOADING") {
      const token = getTokenAuth();
      if (token) {
        setState(validateToken(token));
      } else {
        const tokenGuest = getTokenGuest();
        if (tokenGuest) {
          setState({ type: "GUEST" });
        } else {
          setState(NOT_LOGGED_IN);
        }
      }
    }
  }, [
    state,
    validateToken,
    getTokenAuth,
    getTokenGuest,
    setState,
    removeTokenGuest,
    removeTokenAuth,
    setTokenGuest,
    setTokenAuth,
  ]);

  const handleSetLoggedIn = useCallback(
    (result: Result<{ token: string }>, username: string) => {
      if (result.success) {
        setTokenAuth(result.value.token);
        removeTokenGuest();
        setState({ type: "LOGGED_IN", username, token: result.value.token });
      }
      return result;
    },
    [setTokenAuth, setState, removeTokenGuest]
  );

  const signup = useCallback(
    async (username: string, password: string, email: string, type: string = "LOCAL") =>
      handleSetLoggedIn(await postSignup(username, password, email, type), username),
    [handleSetLoggedIn]
  );

  const login = useCallback(
    async (username: string, password: string, type: string = "LOCAL") =>
      handleSetLoggedIn(await postLogin(username, password, type), username),
    [handleSetLoggedIn]
  );

  const loginAsGuest = useCallback(() => {
    removeTokenAuth();
    setTokenGuest();
    setState({ type: "GUEST" });
    return { success: true as const, value: undefined };
  }, [removeTokenAuth, setState, setTokenGuest]);

  const logout = useCallback(async () => {
    removeTokenAuth();
    removeTokenGuest();
    await postLogout().finally(() => {
      setState(NOT_LOGGED_IN);
    });
  }, [removeTokenAuth, setState, removeTokenGuest]);

  return { state, login, signup, logout, loginAsGuest };
};
