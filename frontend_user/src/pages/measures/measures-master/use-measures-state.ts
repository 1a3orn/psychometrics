import { useState, useCallback as uc } from "react";
import { MeasureDefinition } from "../types";

type MMStateLoading = { type: "loading" };
type MMHomeState = { type: "home" };
type MMSingleTest = {
  type: "one";
  startedAt: string;
};

type MMManyTest = {
  type: "many";
  iteration: number;
  startedAt: string;
};

export type MMState = MMHomeState | MMSingleTest | MMManyTest | MMStateLoading;

export type UseMeasuresStateReturn = {
  state: MMState;
  handleHome: () => void;
  handleStartOne: () => void;
  handleStartMany: () => void;
  handleAdvanceMany: () => void;
};

export const getNow = () => new Date().toISOString();

export const isMany = (state: MMState): state is MMManyTest => state.type === "many";
export const isOne = (state: MMState): state is MMSingleTest => state.type === "one";
export const isHome = (state: MMState): state is MMHomeState => state.type === "home";

const INITIAL_STATE: MMState = { type: "home" };

export const useMeasuresState = (measure: MeasureDefinition): UseMeasuresStateReturn => {
  const [state, ss] = useState<MMState>(INITIAL_STATE);
  const handleHome = uc(() => ss({ type: "home" }), []);
  const handleStartOne = uc(() => ss({ type: "one", startedAt: getNow() }), []);
  const handleStartMany = uc(() => ss({ type: "many", iteration: 0, startedAt: getNow() }), []);

  const handleAdvanceMany = uc(() => {
    if (state.type !== "many") return;

    if (state.iteration < measure.numberPerDefault - 1) {
      const nextIteration = state.iteration + 1;
      const startedAt = getNow();
      ss({ type: "many", iteration: nextIteration, startedAt });
    } else {
      ss({ type: "home" });
    }
  }, [state, measure.numberPerDefault]);

  return { state, handleHome, handleStartOne, handleStartMany, handleAdvanceMany };
};
