import { useState, useCallback } from "react";
import { postGetResetPasswordLink } from "../../api/req-common";

import { useBasicForm } from "../../hooks/use-basic-form";

export const useLoginResetPasswordLink = () => {
  const { state, handleChange } = useBasicForm(["username", "email"]);

  const [stringError, setStringError] = useState<string | null>(null);
  const [stringSuccess, setStringSuccess] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      postGetResetPasswordLink(state.username, state.email).then((response) => {
        if (response.success) {
          setStringSuccess(response.value.message);
        } else {
          setStringError(response.error);
        }
      });
    },
    [state.username, state.email]
  );

  return { state, handleChange, stringError, stringSuccess, handleSubmit };
};
