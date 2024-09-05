import { useCallback, useContext, useMemo } from "react";
import { z } from "zod";
import { MeasureDefinition } from "../types";
import { RunAllKey } from "../../../api/req-user";

import { MMState, useMainState, getNow, UseMeasuresStateReturn } from "./use-main-state";
import { MeasuresMasterDataContext } from "./MainDataProvider";
import { useAuthAwareDataProvider } from "../../../contexts";

type MSR = Record<string, number>;

export type UseMainReturn = Omit<UseMeasuresStateReturn, "state"> & {
  state: MMState;
  userData: RunAllKey[];
  priorRun: Record<string, number> | undefined;
  handleNextMany: (measures: Record<string, number>) => void;
  handleFinishOne: (measures: Record<string, number>) => void;
};

export const useMain = (measure: MeasureDefinition): UseMainReturn => {
  const { runs, reload } = useContext(MeasuresMasterDataContext);
  const { fncs } = useAuthAwareDataProvider();
  const { state, handleHome, handleStartOne, handleStartMany, handleAdvanceMany } = useMainState(measure);

  const priorRun = useMemo(() => (runs && runs.length > 0 ? runs[runs.length - 1].measures : undefined), [runs]);

  const handleOneUpload = useCallback(
    async (measures: MSR) => {
      if (state.type === "home") return;

      const schema = z.record(z.number());

      const validated = schema.parse(measures);

      await fncs.postRun({
        key: measure.key,
        startedAt: state.startedAt,
        endedAt: getNow(),
        metadata: {},
        measures: validated,
      });

      await reload();
    },
    [state, measure, reload, fncs]
  );

  const handleNextMany = useCallback(
    (msr: MSR) => handleOneUpload(msr).then(handleAdvanceMany),
    [handleOneUpload, handleAdvanceMany]
  );

  const handleFinishOne = useCallback(
    (msr: MSR) => handleOneUpload(msr).then(handleHome),
    [handleOneUpload, handleHome]
  );

  return {
    state,
    priorRun,
    userData: runs ?? [],
    handleHome,
    handleStartOne,
    handleStartMany,
    handleNextMany,
    handleFinishOne,
    handleAdvanceMany,
  };
};
