import { createContext } from "react";

import { LatestRuns } from "../../api";
import { useAsync } from "../../hooks";
import { PageMainLoading } from "../../components";
import { useAuthAwareDataProvider } from "../../contexts";

export type UserMainDataType = {
  latestRuns: LatestRuns[];
  refresh: () => void;
  reload: () => void;
};

export const UserMainDataContext = createContext<UserMainDataType>({} as UserMainDataType);

const useGetAllRecentRuns = () => {
  const { fncs } = useAuthAwareDataProvider();
  return useAsync(fncs.getRunsRecent);
};

export const UserMainDataProvider = ({ children }: { children: React.ReactNode }) => {
  const asyncState = useGetAllRecentRuns();

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
