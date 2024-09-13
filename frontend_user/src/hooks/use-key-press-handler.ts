import { useEffect, useCallback } from "react";

type KeyPressHandler = (event: KeyboardEvent) => void;

export const useKeyPress = (keys: string[], callback: KeyPressHandler) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const lowerCaseKey = event.key.toLowerCase();
      const lowerCaseKeys = keys.map((key) => key.toLowerCase());
      if (lowerCaseKeys.includes(lowerCaseKey)) {
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
