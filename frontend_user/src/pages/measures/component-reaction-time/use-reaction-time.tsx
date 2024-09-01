import { useState, useEffect, useCallback, useRef } from "react";

export const useReactionTime = () => {
  const [stage, setStage] = useState<"waiting" | "click" | "result">("waiting");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
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

  const handleClick = () => {
    if (stage === "click" && startTime) {
      const endTime = Date.now();
      const time = endTime - startTime;
      setReactionTime(time);
      setStage("result");
    }
  };

  return { stage, reactionTime, handleClick, startTest };
};
