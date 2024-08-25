import { useState, useCallback, useMemo } from "react";
import { MeasureDefinition } from "../types";
import { useAsync } from "../../../hooks/use-async";
import { uploadMeasure, allKey, Runs } from "../../../api/user";

type MMLoadingState = {
  type: "loading";
};

type MMHomeState = {
  type: "home";
};

type MMOneState = {
  type: "one";
  startedAt: string;
};

type MMManyState = {
  type: "many";
  iteration: number;
  startedAt: string;
};

type MMState = MMHomeState | MMOneState | MMManyState | MMLoadingState;

type Measures = Record<string, number>;

export type UseMeasuresMasterReturn = {
  state: MMState;
  userData: Runs[];
  handleHome: () => void;
  handleStartOne: () => void;
  handleStartMany: () => void;
  handleNextMany: (measures: Record<string, number>) => void;
  handleFinishOne: (measures: Record<string, number>) => void;
};

const getNow = () => new Date().toISOString();

/*
 *
 *
 *  Synchronous state management
 *
 *
 */
const useHandleState = (measure: MeasureDefinition) => {
  const [state, ss] = useState<MMState>({ type: "home" });

  const handleHome = useCallback(() => ss({ type: "home" }), []);
  const handleStartOne = useCallback(() => ss({ type: "one", startedAt: getNow() }), []);
  const handleStartMany = useCallback(() => ss({ type: "many", iteration: 0, startedAt: getNow() }), []);

  const handleAdvanceMany = useCallback(() => {
    if (state.type !== "many") return;
    if (state.iteration < measure.numberPerDefault - 1) {
      const iteration = state.iteration + 1;
      const startedAt = getNow();
      ss({ type: "many", iteration, startedAt });
    } else {
      ss({ type: "home" });
    }
  }, [state]);

  return { state, ss, handleHome, handleStartOne, handleStartMany, handleAdvanceMany };
};

/*
 *
 *
 *  Asynchronous state management
 *
 *
 */
const useHandleAsync = (measure: MeasureDefinition) => {
  const loadingFnc = useCallback(() => allKey(measure.key), [measure.key]);

  const userData = useAsync(loadingFnc);

  return { userData };
};

export const useMeasuresMaster = (measure: MeasureDefinition): UseMeasuresMasterReturn => {
  const { state, handleHome, handleStartOne, handleStartMany, handleAdvanceMany } = useHandleState(measure);

  const { userData } = useHandleAsync(measure);

  const handleOneUpload = useCallback(
    async (measures: Measures) => {
      if (state.type !== "one" && state.type !== "many") return;
      await uploadMeasure({
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
    (msr: Measures) => handleOneUpload(msr).then(handleAdvanceMany),
    [state, handleOneUpload, handleAdvanceMany]
  );

  const handleFinishOne = useCallback(
    async (msr: Measures) => handleOneUpload(msr).then(handleHome),
    [state, handleOneUpload, handleHome]
  );

  const stateSwitched = (() => {
    if (userData.type === "loading") {
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
