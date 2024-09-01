import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSpeechSynthesis, useSequence, useKeyPress, useHandleBoolArray } from "../../../hooks";
import { generateTrials, Trial } from "./generate-trials";

export const useDualNBack = (data: { n: number; totalTrials: number; msDelay: number; msVisible: number }) => {
  const { n, totalTrials, msDelay, msVisible } = data;
  const { playSound } = useSpeechSynthesis();

  // Start the game off running
  // This gets set to false when the game is done
  // and only when the game is done, that's the only time
  // it is changed back
  const [isGameRunning, setIsGameRunning] = useState(true);

  // Generate the trials
  const trials = useMemo(() => generateTrials({ n, totalTrials, percentagePositive: 0.3 }), [n, totalTrials]);

  const [currentIdx, setCurrentIdx] = useState(-1);
  const [curHasVisibleSquare, setCurHasVisibleSquare] = useState(false);
  const [pressedPosition, setPressedPosition] = useState(false);
  const [pressedLetter, setPressedLetter] = useState(false);

  const handleTrial = useCallback(
    (trial: Trial, newIdx: number, isDone: boolean) => {
      setCurrentIdx(trial.index);
      playSound(trial.letter);
      setCurHasVisibleSquare(true);
      setPressedPosition(false);
      setPressedLetter(false);
      setTimeout(() => {
        setCurHasVisibleSquare(false);
        if (isDone) {
          setIsGameRunning(false);
        }
      }, msVisible);
    },
    [currentIdx, trials, playSound, msVisible]
  );

  // Advance the trial every msDelay
  useSequence(trials, msDelay, handleTrial);

  const { arr: userPositionResponses, setTrue: setUserPositionResponseTrue } = useHandleBoolArray(totalTrials);
  const { arr: userLetterResponses, setTrue: setUserLetterResponseTrue } = useHandleBoolArray(totalTrials);

  const respondToPosition = useCallback(() => {
    setUserPositionResponseTrue(currentIdx);
    setPressedPosition(true);
  }, [currentIdx, setUserPositionResponseTrue]);
  const respondToLetter = useCallback(() => {
    setUserLetterResponseTrue(currentIdx);
    setPressedLetter(true);
  }, [currentIdx, setUserLetterResponseTrue]);

  useKeyPress(["a", "A", "s", "S"], respondToPosition);
  useKeyPress(["l", "L", "k", "K"], respondToLetter);

  return {
    isGameRunning,
    currentIdx,
    pressedPosition,
    pressedLetter,
    trials,
    userPositionResponses,
    userLetterResponses,
    curHasVisibleSquare,
    respondToPosition,
    respondToLetter,
  };
};
