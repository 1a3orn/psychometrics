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

  const handleLoginAsGuest = useCallback(() => {
    loginAsGuest().then((result) => {
      if (result.success) {
        nav("/dashboard");
      }
    });
  }, [loginAsGuest, nav]);

  return { state, handleChange, handleLoginClick, handleLoginAsGuest, error };
};
