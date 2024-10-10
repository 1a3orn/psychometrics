import { useMemo, useState, useCallback } from "react";

import { NAVBAR_HEIGHT } from "../../../components";
import { generateTrials } from "./generate-trials";
import { ACCEPTANCE_BAR_HEIGHT } from "./constants";
import { SubmitValues } from "../types";

export const useCorsiBlockTapping = ({
  handleSubmit,
  priorRun,
}: {
  handleSubmit: (data: SubmitValues) => void;
  priorRun: Record<string, number> | undefined;
}) => {
  // Immutable
  const trials = useMemo(() => generateTrials({ maxTrials: 30 }), []);

  const startTrialIndex = useMemo(() => {
    if (!priorRun) return 2;
    return Math.max(2, priorRun.highest_sequence - 2);
  }, [priorRun]);

  const [currentTrialIndex, setCurrentTrialIndex] = useState(startTrialIndex);
  const [highestSuccessIndex, setHighestSuccessIndex] = useState(startTrialIndex - 1);
  const [phase, setPhase] = useState<"running" | "results">("running");

  const viewHeight = useMemo(() => {
    return window.innerHeight - ACCEPTANCE_BAR_HEIGHT - NAVBAR_HEIGHT;
  }, []);

  const handleCompletedTrialSuccessfully = useCallback(() => {
    setHighestSuccessIndex(currentTrialIndex);
    setCurrentTrialIndex(currentTrialIndex + 1);
  }, [currentTrialIndex]);

  const handleCompletedTrialUnsuccessfully = useCallback(() => {
    setPhase("results");
  }, []);

  const results = useMemo(() => {
    return [{ name: "Highest Success Index", value: highestSuccessIndex }];
  }, [highestSuccessIndex]);

  const handleSubmitInner = useCallback(() => {
    setPhase("running");
    handleSubmit([
      {
        key: "highest_sequence",
        value: highestSuccessIndex,
        displayLabel: "Highest Success Index",
        displayValue: highestSuccessIndex.toString(),
      },
    ]);
  }, [handleSubmit, highestSuccessIndex]);

  return {
    trials,
    currentTrialIndex,
    highestSuccessIndex,
    phase,
    handleCompletedTrialSuccessfully,
    handleCompletedTrialUnsuccessfully,
    setCurrentTrialIndex,
    handleSubmitInner,
    viewHeight,
    results,
  };
};
