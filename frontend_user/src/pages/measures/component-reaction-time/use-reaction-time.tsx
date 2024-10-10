import { useState, useCallback, useMemo } from "react";
import { useTimeout } from "../../../hooks";
import { SubmitValues } from "../types";

type State = { stage: "waiting" } | { stage: "click"; startTime: number };

export const useReactionTime = ({
  handleSubmit,
}: {
  handleSubmit: (data: SubmitValues) => void;
}) => {
  // ---------------------
  // Random delay between 1 and 100 seconds
  // ---------------------
  const delay = useMemo(() => Math.floor(Math.random() * 2000) + 1000, []);

  // ---------------------
  // State
  const [state, setState] = useState<State>({ stage: "waiting" });

  const handleIsReady = useCallback(() => {
    if (state.stage !== "waiting") return;
    setState({ stage: "click", startTime: Date.now() });
  }, [state]);

  const handleClick = useCallback(() => {
    if (state.stage !== "click") return;
    const endTime = Date.now();
    const reactionTime = endTime - state.startTime;
    handleSubmit([
      {
        key: "reaction_time",
        value: reactionTime,
        displayLabel: "Reaction Time",
        displayValue: reactionTime.toFixed(2),
      },
    ]);
  }, [state, handleSubmit]);

  useTimeout({
    callback: handleIsReady,
    timeout: delay,
  });

  return {
    state,
    handleClick,
    handleSubmit,
  };
};
