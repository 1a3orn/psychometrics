import { useState, useCallback, useMemo } from "react";
import { useTimeout } from "../../../hooks";
import { SubmitValues } from "../types";
type TestState =
  | { stage: "waiting" }
  | { stage: "click"; startTime: number }
  | { stage: "result"; reactionTime: number };

export const useReactionTime = ({ handleSubmit }: { handleSubmit: (data: SubmitValues) => void }) => {
  const delay = useMemo(() => Math.floor(Math.random() * 9000) + 1000, []);

  const [testState, setTestState] = useState<TestState>({ stage: "waiting" });

  const handleIsReady = useCallback(() => {
    if (testState.stage === "waiting") {
      setTestState({ stage: "click", startTime: Date.now() });
    }
  }, [testState]);

  useTimeout({
    callback: handleIsReady,
    timeout: delay,
  });

  const handleClick = useCallback(() => {
    if (testState.stage === "click") {
      const endTime = Date.now();
      const reactionTime = endTime - testState.startTime;
      setTestState({ stage: "result", reactionTime });
    }
  }, [testState]);

  const handleSubmitInner = useCallback(() => {
    if (testState.stage === "result") {
      handleSubmit([
        {
          key: "reaction_time",
          value: testState.reactionTime,
          displayLabel: "Reaction Time",
          displayValue: testState.reactionTime.toFixed(2),
        },
      ]);
    }
  }, [handleSubmit, testState]);

  return {
    state: testState,
    handleClick,
    handleSubmitInner,
  };
};
