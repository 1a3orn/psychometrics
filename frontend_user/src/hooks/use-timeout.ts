import { useEffect, useRef } from "react";

/**
 * The following hook
 * takes a function and a timeout,
 * and calls the function after the timeout
 * has elapsed. It only ever calls the function once.
 *
 * It also unsubscribes from the timeout if the component is unmounted.
 */
export const useTimeout = ({ callback, timeout }: { callback: () => void; timeout: number }) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const timeoutId = setTimeout(() => callbackRef.current(), timeout);
    return () => clearTimeout(timeoutId);
  }, [timeout]);
};
