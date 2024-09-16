import { useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { postResetPassword } from "../../api/req-common";

import { useBasicForm } from "../../hooks/use-basic-form";

export const useLoginResetPassword = () => {
  const { state, errors, handleChange } = useBasicForm(["password1", "password2"]);

  // Pull username + reset code from query params
  const [searchParams, setSearchParams] = useSearchParams();
  const username = useMemo(() => searchParams.get("username"), [searchParams]);
  const resetCode = useMemo(() => searchParams.get("resetCode"), [searchParams]);

  const [stringError, setStringError] = useState<string | null>(null);
  const [stringSuccess, setStringSuccess] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!username || !resetCode) {
        setStringError("Missing username or reset code");
        return;
      }
      if (!state.password1 || !state.password2) {
        setStringError("Missing password");
        return;
      }
      if (state.password1 !== state.password2) {
        setStringError("Passwords do not match");
        return;
      }

      postResetPassword(username, resetCode, state.password1).then((response) => {
        if (response.success) {
          setStringSuccess(response.value.message);
        } else {
          setStringError(response.error);
        }
      });
    },
    [state.password1, state.password2, username, resetCode]
  );

  return { username, state, handleChange, stringError, stringSuccess, handleSubmit };
};
