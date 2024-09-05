import { createContext, useContext } from "react";

import { UserContextType } from "./types";
import { useHandleState } from "./use-handle-state";

const UserContext = createContext<UserContextType>({} as UserContextType);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const values = useHandleState();
  if (values.state.type === "LOADING") {
    return null;
  } else {
    return (
      <UserContext.Provider key={values.state.type} value={values}>
        {children}
      </UserContext.Provider>
    );
  }
};
