import { createContext, useContext } from "react";

import { AuthAwareDataProviderType } from "./types";
import { useHandleState } from "./use-handle-state";

const AuthAwareDataContext = createContext<AuthAwareDataProviderType>({} as AuthAwareDataProviderType);

export const useAuthAwareDataProvider = () => useContext(AuthAwareDataContext);

export const AuthAwareDataProvider = ({ children }: { children: React.ReactNode }) => {
  const values = useHandleState();
  return <AuthAwareDataContext.Provider value={values}>{children}</AuthAwareDataContext.Provider>;
};
