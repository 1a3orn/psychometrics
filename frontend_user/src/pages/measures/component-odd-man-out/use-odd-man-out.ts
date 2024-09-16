import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useKeyPress } from "../../../hooks";

export type Trial = {
  objects: [number, number, number];
  correctAnswer: "left" | "right";
};

export type UserResponse = {
  response: "left" | "right";
  reactionTime: number;
};

const num = () => Math.floor(Math.random() * 100);

const getCandidateNums = (): [number, number, number] => {
  let nums = [num(), num(), num()];
  nums.sort((a, b) => a - b);
  return nums as [number, number, number];
};

const numsAreValid = (nums: [number, number, number]) => {
  let [left, middle, right] = nums;
  let leftDiff = Math.abs(middle - left);
  let rightDiff = Math.abs(right - middle);
  let greaterDiff = rightDiff > leftDiff ? rightDiff : leftDiff;
  let lesserDiff = rightDiff < leftDiff ? rightDiff : leftDiff;
  let differenceRatio = greaterDiff / lesserDiff;

  let atLeastDifferentBy10 = greaterDiff > 20 && lesserDiff > 20;

  return differenceRatio >= 1.8 && atLeastDifferentBy10;
};

const generateTrial = (): Trial => {
  let [left, middle, right] = getCandidateNums();

  let times = 0;
  while (!numsAreValid([left, middle, right])) {
    [left, middle, right] = getCandidateNums();
    times++;
  }
  console.log(times);

  return {
    objects: [left, middle, right],
    correctAnswer: Math.abs(middle - left) < Math.abs(middle - right) ? "left" : "right",
  };
};

export const useOddManOut = ({ totalTrials }: { totalTrials: number }) => {
  const [trialNumber, setTrialNumber] = useState(0);
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [isGameRunning, setIsGameRunning] = useState(true);
  const startTimeRef = useRef<number | null>(null);

  const trials = useMemo(() => Array.from({ length: totalTrials }, () => generateTrial()), [totalTrials]);

  const currentTrial = trials[trialNumber];

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, [trialNumber]);

  const handleUserResponse = useCallback(
    (response: "left" | "right") => {
      const endTime = Date.now();
      const reactionTime = startTimeRef.current ? endTime - startTimeRef.current : 0;

      setUserResponses((prev) => [...prev, { response, reactionTime }]);

      if (trialNumber + 1 < totalTrials) {
        setTrialNumber((prev) => prev + 1);
      } else {
        setIsGameRunning(false);
      }
    },
    [trialNumber, totalTrials]
  );

  useKeyPress(["a", "A"], () => handleUserResponse("left"));
  useKeyPress(["l", "L"], () => handleUserResponse("right"));

  return {
    isGameRunning,
    currentTrial,
    trialNumber: trialNumber + 1,
    userResponses,
    trials,
    handleUserResponse,
  };
};
