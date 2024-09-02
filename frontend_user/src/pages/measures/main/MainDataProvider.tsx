import { createContext, useCallback } from "react";

import { getAllKey, RunAllKey } from "../../../api";
import { useAsync } from "../../../hooks";
import { PageMainLoading } from "../../../components";
import { MeasureDefinition } from "../types";

export type UserMainDataType = { runs: RunAllKey[]; reload: () => void; refresh: () => void };

export const MeasuresMasterDataContext = createContext<UserMainDataType>({} as UserMainDataType);

const useDelayedGetAllKey = (measure: MeasureDefinition) => {
  const loadingFnc = useCallback(() => getAllKey(measure.key), [measure.key]);
  return useAsync(loadingFnc);
};

export const MainDataProvider = ({ children, measure }: { children: React.ReactNode; measure: MeasureDefinition }) => {
  const asyncState = useDelayedGetAllKey(measure);
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
