import { useState, useCallback } from "react";
import { MeasureDefinition } from "../types";

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

export type MMState = MMHomeState | MMOneState | MMManyState | MMLoadingState;

export const getNow = () => new Date().toISOString();

export const useMeasuresState = (measure: MeasureDefinition) => {
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
