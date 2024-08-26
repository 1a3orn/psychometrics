import { useCallback } from "react";
import { MeasureDefinition } from "../types";
import { useAsync } from "../../../hooks/use-async";
import { postUploadMeasure, getAllKey, RunAllKey } from "../../../api/req-user";

import { MMState, useMeasuresState, getNow } from "./use-measures-state";

type MSR = Record<string, number>;

export type UseMeasuresMasterReturn = {
  state: MMState;
  userData: RunAllKey[];
  handleHome: () => void;
  handleStartOne: () => void;
  handleStartMany: () => void;
  handleNextMany: (measures: Record<string, number>) => void;
  handleFinishOne: (measures: Record<string, number>) => void;
};

const undefPromise = () => Promise.resolve();

const useHandleAsync = (measure: MeasureDefinition) => {
  const loadingFnc = useCallback(() => getAllKey(measure.key), [measure.key]);
  console.log("loadingFnc", measure.key, loadingFnc);
  const userData = useAsync(loadingFnc);
  return { userData };
};

export const useMeasuresMaster = (measure: MeasureDefinition): UseMeasuresMasterReturn => {
  const { state, handleHome, handleStartOne, handleStartMany, handleAdvanceMany } = useMeasuresState(measure);

  const { userData } = useHandleAsync(measure);

  const handleOneUpload = useCallback(
    async (measures: MSR) => {
      if (state.type === "loading" || state.type === "home") return;
      await postUploadMeasure({
        key: measure.key,
        startedAt: state.startedAt,
        endedAt: getNow(),
        metadata: {},
        measures: Object.entries(measures).map(([key, value]) => ({ key, number: value })),
      }).then(userData.reload);
    },
    [state, measure, userData.reload]
  );

  const handleNextMany = useCallback(
    (msr: MSR) => handleOneUpload(msr).then(handleAdvanceMany),
    [handleOneUpload, handleAdvanceMany]
  );

  const handleFinishOne = useCallback(
    (msr: MSR) => handleOneUpload(msr).then(handleHome),
    [handleOneUpload, handleHome]
  );

  const stateSwitched = (() => {
    if (userData?.type === "loading") {
      return { type: "loading" as const };
    }
    return state;
  })();

  return {
    state: stateSwitched,
    userData: userData.data ?? [],
    handleHome,
    handleStartOne,
    handleStartMany,
    handleNextMany,
    handleFinishOne,
  };
};
