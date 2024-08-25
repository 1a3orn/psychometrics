import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../contexts";

export const useRedirectIfNotLoggedIn = () => {
  const { state } = useUser();
  const nav = useNavigate();

  useEffect(() => {
    if (state.type === "NOT_LOGGED_IN") {
      nav("/login");
    }
  }, [state, nav]);
};
