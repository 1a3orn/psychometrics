import { useMemo, useState, useCallback } from "react";

import { NAVBAR_HEIGHT } from "../../../components";
import { generateTrials } from "./generate-trials";
import { ACCEPTANCE_BAR_HEIGHT } from "./constants";

export const useCorsiBlockTapping = ({ handleSubmit }: { handleSubmit: (data: Record<string, number>) => void }) => {
  const trials = useMemo(() => generateTrials({ maxTrials: 30 }), []);

  const [currentTrialIndex, setCurrentTrialIndex] = useState(3);
  const [highestSuccessIndex, setHighestSuccessIndex] = useState(3);
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
    handleSubmit({ highest_sequence: highestSuccessIndex });
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
