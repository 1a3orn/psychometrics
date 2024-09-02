import { createContext } from "react";

import { getLatestRuns, LatestRuns } from "../../api";
import { useAsync, AsyncState } from "../../hooks";

const request = async () => {
  const [runs] = await Promise.all([getLatestRuns()]);
  return { latestRuns: runs };
};

export type UserMainContextType = AsyncState<{ latestRuns: LatestRuns[] }>;

export const UserMainContext = createContext<UserMainContextType>({
  data: undefined,
  type: "loading",
});

export const UserMainProvider = ({ children }: { children: React.ReactNode }) => {
  const asyncState = useAsync(request);
  return <UserMainContext.Provider value={asyncState}>{children}</UserMainContext.Provider>;
};
