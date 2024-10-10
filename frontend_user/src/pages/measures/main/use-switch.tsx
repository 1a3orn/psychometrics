import { useCallback, useContext, useMemo } from "react";
import { MeasureDefinition } from "../types";
import { RunAllKey } from "../../../api/req-user";

import { schemaRun } from "../../../shared-automatic";

import { MMState, useSwitchOnState, UseMeasuresStateReturn } from "./use-switch-on-state";
import { MeasuresMasterDataContext } from "./MainDataProvider";
import { useAuthAwareDataProvider } from "../../../contexts";

export type Run = {
  key: string;
  startedAt: string;
  endedAt: string;
  metadata: object;
  measures: Record<string, number>;
};

export type UseSwitchReturn = Omit<UseMeasuresStateReturn, "state"> & {
  state: MMState;
  runs: RunAllKey[];
  handleUploads: (measures: Run[]) => void;
  handleHome: () => void;
  handleStartOne: () => void;
  handleStartMany: () => void;
  handleConclude: (measures: Run[]) => void;
};

export const useSwitch = (measure: MeasureDefinition): UseSwitchReturn => {
  const { runs, refresh } = useContext(MeasuresMasterDataContext);
  const { fncs } = useAuthAwareDataProvider();
  const { state, handleHome, handleStartOne, handleStartMany } = useSwitchOnState(measure);

  const handleUploads = useCallback(
    async (measures: Run[]) => {
      if (state.type === "home") return;

      const validated = schemaRun.array().parse(measures);
      await fncs.postRuns(validated);
      await refresh();
    },
    [state, measure, refresh, fncs]
  );

  const handleConclude = useCallback(
    async (measures: Run[]) => {
      const validated = schemaRun.array().parse(measures);
      await fncs.postRuns(validated);
      await handleHome();
      await refresh();
    },
    [state, measure, refresh, fncs]
  );

  return {
    state,
    runs: runs ?? [],
    handleUploads,
    handleHome,
    handleStartOne,
    handleStartMany,
    handleConclude,
  };
};
