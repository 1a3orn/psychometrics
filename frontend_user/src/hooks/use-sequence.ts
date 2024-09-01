import { useCallback, useEffect, useState, useRef } from "react";

export const useSequence = <T>(
  sequence: T[],
  interval: number,
  callback: (item: T, idx: number, isDone: boolean) => void
) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const processItem = useCallback(() => {
    if (currentIdx < sequence.length) {
      const isDone = currentIdx === sequence.length - 1;
      callback(sequence[currentIdx], currentIdx, isDone);
      setCurrentIdx((prevIdx) => prevIdx + 1);
    }
  }, [currentIdx, sequence, callback]);

  useEffect(() => {
    if (currentIdx < sequence.length) {
      timeoutRef.current = setTimeout(processItem, interval);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIdx, interval, processItem, sequence.length]);

  return { currentIdx, isRunning: currentIdx < sequence.length };
};
