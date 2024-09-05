import { useEffect, useRef } from "react";

export function useEffectOnce<T extends ReadonlyArray<any>>(
  callback: () => void | (() => void),
  dependencies: T
): void {
  const didRun = useRef(false);
  const prevDeps = useRef<T | null>(null);
  const callbackRef = useRef(callback);

  // Update the callback ref whenever it changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const depsChanged = prevDeps.current ? dependencies.some((dep, i) => dep !== prevDeps.current![i]) : true;

    if (!didRun.current || depsChanged) {
      didRun.current = true;
      prevDeps.current = dependencies;
      return callbackRef.current();
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
}
