import { useState, useCallback, useMemo } from "react";
import { useTimeout, useKeyPress } from "../../../hooks";

import { SubmitValues } from "../types";

export type Choice = "A" | "S" | "K" | "L";
const CHOICES: Choice[] = ["A", "S", "K", "L"];

type TestState =
  | { stage: "waiting" }
  | { stage: "click"; startTime: number }
  | { stage: "result"; reactionTime: number; correct: boolean };

const getRandomChoice = (): Choice => {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
};

export const useReactionTime4Choice = ({ handleSubmit }: { handleSubmit: (data: SubmitValues) => void }) => {
  // Immutable during hook lifecycle
  const choice = useMemo<Choice>(() => getRandomChoice(), []);
  const delay = useMemo(() => Math.floor(Math.random() * 9000) + 1000, []);

  // Mutable during hook lifecycle
  const [state, setState] = useState<TestState>({ stage: "waiting" });

  // Handlers
  const handleSubmitInner = useCallback(() => {
    if (state.stage === "result") {
      handleSubmit([
        {
          key: "accuracy",
          value: state.correct ? 1 : 0,
          displayLabel: "Accuracy",
          displayValue: state.correct ? "yes" : "no",
        },
        {
          key: "reaction_time",
          value: state.reactionTime,
          displayLabel: "Reaction Time",
          displayValue: state.reactionTime.toFixed(2),
        },
      ]);
    }
  }, [handleSubmit, state]);

  const handleStart = useCallback(() => {
    if (state.stage === "waiting") {
      setState({ stage: "click", startTime: Date.now() });
    }
  }, [state]);

  useTimeout({ callback: handleStart, timeout: delay });

  useKeyPress(CHOICES, (event: KeyboardEvent) => {
    if (state.stage === "click") {
      const endTime = Date.now();
      const reactionTime = endTime - state.startTime;
      const correct = event.key.toLowerCase() === choice.toLowerCase();
      setState({ stage: "result", reactionTime, correct });
    }
  });

  return {
    state,
    choice,
    handleSubmitInner,
  };
};
