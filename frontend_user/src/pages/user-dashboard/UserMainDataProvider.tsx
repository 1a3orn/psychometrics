import { createContext } from "react";

import { getLatestRuns, LatestRuns } from "../../api";
import { useAsync } from "../../hooks";
import { PageMainLoading } from "../../components";

export type UserMainDataType = { latestRuns: LatestRuns[]; refresh: () => void; reload: () => void };

export const UserMainDataContext = createContext<UserMainDataType>({} as UserMainDataType);

const delayedGetLatest = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return getLatestRuns();
};

export const UserMainDataProvider = ({ children }: { children: React.ReactNode }) => {
  const asyncState = useAsync(delayedGetLatest);
  if (asyncState.type === "loading") {
    return <PageMainLoading />;
  } else if (asyncState.type === "failure") {
    return <PageMainLoading />;
  } else {
    return (
      <UserMainDataContext.Provider
        value={{ latestRuns: asyncState.data, refresh: asyncState.refresh, reload: asyncState.reload }}
      >
        {children}
      </UserMainDataContext.Provider>
    );
  }
};
