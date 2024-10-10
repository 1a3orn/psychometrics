import { useState, useCallback as uc } from "react";
import { MeasureDefinition } from "../types";

type MMViewState = { type: "view" };
type MMPlayState = {
  type: "play";
  iterations: number;
};

export type MMState = MMViewState | MMPlayState;

export type UseMeasuresStateReturn = {
  state: MMState;
  setMeasureView: () => void;
  setMeasurePlayOne: () => void;
  setMeasurePlayMany: () => void;
};

export const getNow = () => new Date().toISOString();

export const isPlay = (s: MMState): s is MMPlayState => s.type === "play";
export const isView = (s: MMState): s is MMViewState => s.type === "view";

const INITIAL_STATE: MMState = { type: "view" };

export const useSwitchOnState = (
  measure: MeasureDefinition
): UseMeasuresStateReturn => {
  const [state, ss] = useState<MMState>(INITIAL_STATE);

  const setMeasureView = uc(() => ss({ type: "view" }), []);
  const setMeasurePlayOne = uc(() => ss({ type: "play", iterations: 1 }), []);
  const setMeasurePlayMany = uc(
    () => ss({ type: "play", iterations: measure.numberPerDefault }),
    []
  );

  return { state, setMeasureView, setMeasurePlayOne, setMeasurePlayMany };
};
