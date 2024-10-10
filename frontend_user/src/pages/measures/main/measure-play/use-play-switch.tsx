import { useState, useCallback } from "react";

import { MeasureDefinition } from "../../types";
import { RunWithExtra } from "./use-play-active";

type States =
  | { state: "play" }
  | { state: "done"; testResults: Array<RunWithExtra> };

export type PlaySwitchContextType = {
  state: States;
  measure: MeasureDefinition;
  iterations: number;
  handleSetDone: (accumRes: Array<RunWithExtra>) => void;
};

export const usePlaySwitch = ({
  measure,
  iterations,
}: {
  measure: MeasureDefinition;
  iterations: number;
}) => {
  const [state, setStateInner] = useState<States>({ state: "play" });

  const handleSetDone = useCallback((testResults: Array<RunWithExtra>) => {
    setStateInner({ state: "done", testResults });
  }, []);

  return { state, measure, iterations, handleSetDone };
};
