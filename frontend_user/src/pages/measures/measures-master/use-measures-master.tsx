import { useCallback } from "react";
import { MeasureDefinition } from "../types";
import { useAsync } from "../../../hooks/use-async";
import { postUploadMeasure, getAllKey, RunAllKey } from "../../../api/req-user";

import { MMState, useMeasuresState, getNow, UseMeasuresStateReturn } from "./use-measures-state";

type MSR = Record<string, number>;

export type UseMeasuresMasterReturn = Omit<UseMeasuresStateReturn, "state"> & {
  state: MMState;
  userData: RunAllKey[];
  priorRun: Array<{ key: string; number: number }> | undefined;
  handleNextMany: (measures: Record<string, number>) => void;
  handleFinishOne: (measures: Record<string, number>) => void;
};

const useHandleAsync = (measure: MeasureDefinition) => {
  const loadingFnc = useCallback(() => getAllKey(measure.key), [measure.key]);
  const userData = useAsync(loadingFnc);
  return { userData };
};

export const useMeasuresMaster = (measure: MeasureDefinition): UseMeasuresMasterReturn => {
  const { state, handleHome, handleStartOne, handleStartMany, handleAdvanceMany } = useMeasuresState(measure);

  const { userData } = useHandleAsync(measure);

  const priorRun =
    userData.data && userData.data.length > 0 ? userData.data[userData.data.length - 1].measures : undefined;

  const handleOneUpload = useCallback(
    async (measures: MSR) => {
      if (state.type === "home" || state.type === "loading") return;

      await postUploadMeasure({
        key: measure.key,
        startedAt: state.startedAt,
        endedAt: getNow(),
        metadata: {},
        measures: Object.entries(measures).map(([key, value]) => ({ key, number: value })),
      });

      await userData.reload();
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
    priorRun,
    userData: userData.data ?? [],
    handleHome,
    handleStartOne,
    handleStartMany,
    handleNextMany,
    handleFinishOne,
    handleAdvanceMany,
  };
};
