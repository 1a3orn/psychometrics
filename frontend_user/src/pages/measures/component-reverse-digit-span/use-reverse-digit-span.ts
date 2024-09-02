import { useState, useCallback } from "react";
import { Measure } from "../../../api";

export const useReverseDigitSpan = () => {
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [history, setHistory] = useState<{ number: string; length: number; success: boolean }[]>([]);

  const handleFinish = useCallback((history: { number: string; length: number; success: boolean }[]) => {
    setIsGameRunning(false);
    setHistory(history);
  }, []);

  return {
    isGameRunning,
    history,
    handleFinish,
  };
};
