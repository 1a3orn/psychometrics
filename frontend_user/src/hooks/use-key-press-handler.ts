import { useEffect, useCallback } from "react";

type KeyPressHandler = (event: KeyboardEvent) => void;

export const useKeyPress = (keys: string[], callback: KeyPressHandler) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (keys.includes(event.key)) {
        callback(event);
      }
    },
    [keys, callback]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
};
