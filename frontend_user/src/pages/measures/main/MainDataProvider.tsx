import { createContext, useCallback } from "react";

import { RunAllKey } from "../../../api";
import { useAsync } from "../../../hooks";
import { PageMainLoading } from "../../../components";
import { MeasureDefinition } from "../types";
import { useAuthAwareDataProvider } from "../../../contexts";

export type UserMainDataType = {
  runs: RunAllKey[];
  reload: () => void;
  refresh: () => void;
};

export const MeasuresMasterDataContext = createContext<UserMainDataType>({} as UserMainDataType);

const useGetAllRunsForKey = (measureKey: string) => {
  const { fncs } = useAuthAwareDataProvider();

  const loadingFnc = useCallback(() => fncs.getRunsAll(measureKey), [fncs, measureKey]);

  console.log("loadingFnc", loadingFnc);

  return useAsync(loadingFnc);
};

export const MainDataProvider = ({ children, measure }: { children: React.ReactNode; measure: MeasureDefinition }) => {
  const asyncState = useGetAllRunsForKey(measure.key);

  console.log("asyncState", asyncState);

  if (asyncState.type === "loading") {
    return <PageMainLoading />;
  } else if (asyncState.type === "failure") {
    return <PageMainLoading />;
  } else {
    return (
      <MeasuresMasterDataContext.Provider
        value={{ runs: asyncState.data, reload: asyncState.reload, refresh: asyncState.refresh }}
      >
        {children}
      </MeasuresMasterDataContext.Provider>
    );
  }
};
