import { useState, useEffect, useCallback, useRef, useMemo } from "react";

export type Choice = "A" | "S" | "K" | "L";
const CHOICES: Choice[] = ["A", "S", "K", "L"];

export const useReactionTime4Choice = () => {
  const [stage, setStage] = useState<"waiting" | "click" | "result">("waiting");

  const choice = useMemo<Choice>(() => CHOICES[Math.floor(Math.random() * CHOICES.length)], []);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTest = useCallback(() => {
    const delay = Math.floor(Math.random() * 9000) + 1000; // 1-10 seconds
    timeoutRef.current = setTimeout(() => {
      if (stage === "waiting") {
        setStage("click");
        setStartTime(Date.now());
      }
    }, delay);
  }, [stage]);

  useEffect(() => {
    if (stage === "waiting") {
      startTest();
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [stage, startTest]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (stage === "click" && startTime) {
        const endTime = Date.now();
        const time = endTime - startTime;
        setReactionTime(time);
        if (event.key.toLowerCase() === choice.toLowerCase()) {
          setCorrect(true);
        } else {
          setCorrect(false);
        }
        setStage("result");
      }
    },
    [stage, startTime, choice]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return { stage, choice, correct, reactionTime, startTest };
};
