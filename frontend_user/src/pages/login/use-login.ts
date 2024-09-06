import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

import { useUser } from "../../contexts/user";
import { useBasicForm } from "../../hooks";

export const useLogin = () => {
  const { state, handleChange } = useBasicForm(["username", "password"]);
  const { login, loginAsGuest } = useUser();

  const [error, setError] = useState<string | null>(null);

  const nav = useNavigate();
  const handleLoginClick = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      login(state.username, state.password).then((result) => {
        if (result.success) {
          nav("/dashboard");
        } else {
          setError(result.error);
        }
      });
    },
    [login, state, nav]
  );

  const handleLoginAsGuest = useCallback(async () => {
    try {
      const result = loginAsGuest();
      if (result.success) {
        console.log("navigating to dashboard");
        nav("/dashboard");
      } else {
        // Handle error if needed
        console.error("Guest login failed:", result.error);
      }
    } catch (error) {
      console.error("Error during guest login:", error);
    }
  }, [loginAsGuest, nav]);

  return { state, handleChange, handleLoginClick, handleLoginAsGuest, error };
};
