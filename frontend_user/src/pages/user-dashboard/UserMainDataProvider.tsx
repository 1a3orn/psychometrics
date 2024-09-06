import { createContext } from "react";

import { LatestRuns } from "../../api";
import { useAsync } from "../../hooks";
import { ALL_MEASURES, MeasureDefinition } from "../measures";
import { PageMainLoading } from "../../components";
import { useAuthAwareDataProvider } from "../../contexts";

export type MeasureWithLatestRun = MeasureDefinition & {
  latestRun: LatestRuns;
};

export type UserMainDataType = {
  tasks: MeasureWithLatestRun[];
  refresh: () => void;
  reload: () => void;
};

export const UserMainDataContext = createContext<UserMainDataType>({} as UserMainDataType);

const useGetAllRecentRuns = () => {
  const { fncs } = useAuthAwareDataProvider();
  return useAsync(async () => {
    const latestRuns = await fncs.getRunsRecent();
    const measuresWithLatestRuns = ALL_MEASURES.map((measure) => {
      const latestRun = latestRuns.find((run) => run.key === measure.key);
      return {
        ...measure,
        latestRun: latestRun || null,
      };
    });
    return measuresWithLatestRuns as MeasureWithLatestRun[];
  });
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
        value={{ tasks: asyncState.data, refresh: asyncState.refresh, reload: asyncState.reload }}
      >
        {children}
      </UserMainDataContext.Provider>
    );
  }
};
