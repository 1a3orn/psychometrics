import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

import { useBasicForm } from "../../hooks";
import { useUser } from "../../contexts/user";

export const useLoginSignup = () => {
  const { state, handleChange } = useBasicForm(["username", "password", "email"]);

  const nav = useNavigate();
  const { signup } = useUser();

  const [error, setError] = useState<string | null>(null);

  const handleLoginClick = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      signup(state.username, state.password, state.email).then((result) => {
        if (result.success) {
          nav("/dashboard");
        } else {
          setError(result.error);
        }
      });
    },
    [signup, state, nav]
  );

  return { state, handleChange, handleLoginClick, error };
};
