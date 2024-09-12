import { useState, useCallback } from "react";

import { useSequence } from "../../../hooks";

import { Trial } from "./types";

const MS_BETWEEN = 500;
const MS_VISIBLE = 400;

export const useCorsiBlockTappingOneTrial = ({
  trial,
  onSuccess,
  onFailure,
}: {
  trial: Trial;
  onSuccess: () => void;
  onFailure: () => void;
}) => {
  const [phase, setPhase] = useState<"playing" | "waiting">("playing");

  const [highlightedSqIdx, setHighlightedSqIdx] = useState<number | null>(null);

  const [tappedIndices, setTappedIndices] = useState<number[]>([]);

  useSequence(trial.sequenceIndices, MS_BETWEEN, (item, idx, isDone) => {
    setHighlightedSqIdx(item);
    setTimeout(() => {
      setHighlightedSqIdx(null);
      if (isDone) {
        setPhase("waiting");
      }
    }, MS_VISIBLE);
  });

  const handleClickedSquare = useCallback(
    (idx: number) => {
      // Do nothing if not your turn
      if (phase === "playing") return;
      setHighlightedSqIdx(idx);
      setTappedIndices((prev) => [...prev, idx]);
      setTimeout(() => {
        setHighlightedSqIdx(null);
      }, MS_VISIBLE);
    },
    [highlightedSqIdx, trial.sequenceIndices, onSuccess, onFailure]
  );

  const handleFinishClick = useCallback(() => {
    const isCorrect =
      trial.sequenceIndices.every((tap, idx) => tap === tappedIndices[idx]) &&
      tappedIndices.length === trial.sequenceIndices.length;
    console.log(trial.sequenceIndices);
    console.log(tappedIndices);
    if (isCorrect) {
      console.log("Correct");
      onSuccess();
    } else {
      console.log("Incorrect");
      onFailure();
    }
  }, [trial.sequenceIndices, tappedIndices, onSuccess, onFailure]);

  return {
    highlightedSqIdx,
    phase,
    handleClickedSquare,
    handleFinishClick,
  };
};
