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
  measure: MeasureDefinition;
};

export const MeasuresMasterDataContext = createContext<UserMainDataType>(
  {} as UserMainDataType
);

const useMainData = (measure: MeasureDefinition) => {
  const { fncs } = useAuthAwareDataProvider();
  const loadingFnc = useCallback(
    () => fncs.getRunsAll(measure.key),
    [fncs, measure.key]
  );
  const value = useAsync(loadingFnc);
  return value;
};

export const MainDataProvider = ({
  children,
  measure,
}: {
  children: React.ReactNode;
  measure: MeasureDefinition;
}) => {
  const asyncState = useMainData(measure);

  if (asyncState.type === "loading") {
    return <PageMainLoading />;
  } else if (asyncState.type === "failure") {
    return <PageMainLoading />;
  } else {
    return (
      <MeasuresMasterDataContext.Provider
        value={{
          runs: asyncState.data,
          reload: asyncState.reload,
          refresh: asyncState.refresh,
          measure,
        }}
      >
        {children}
      </MeasuresMasterDataContext.Provider>
    );
  }
};
