import { useState, useCallback as uc } from "react";
import { MeasureDefinition } from "../types";

type MMHomeState = { type: "home" };
type MMPlayingState = {
  type: "playing";
  numberToPlay: number;
};

export type MMState = MMHomeState | MMPlayingState;

export type UseMeasuresStateReturn = {
  state: MMState;
  handleHome: () => void;
  handleStartOne: () => void;
  handleStartMany: () => void;
};

export const getNow = () => new Date().toISOString();

export const isPlaying = (state: MMState): state is MMPlayingState => state.type === "playing";
export const isHome = (state: MMState): state is MMHomeState => state.type === "home";

const INITIAL_STATE: MMState = { type: "home" };

export const useSwitchOnState = (measure: MeasureDefinition): UseMeasuresStateReturn => {
  const [state, ss] = useState<MMState>(INITIAL_STATE);
  const handleHome = uc(() => ss({ type: "home" }), []);
  const handleStartOne = uc(() => ss({ type: "playing", numberToPlay: 1 }), []);
  const handleStartMany = uc(() => ss({ type: "playing", numberToPlay: measure.numberPerDefault }), []);

  return { state, handleHome, handleStartOne, handleStartMany };
};
