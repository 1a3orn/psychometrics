import React, { useEffect, useRef } from "react";

export function useEffectOnce<T extends ReadonlyArray<any>>(
  callback: () => void | (() => void),
  dependencies: T
): null {
  const didRun = useRef(false);
  const prevDeps = useRef<T | null>(null);

  useEffect(() => {
    const depsChanged = prevDeps.current ? dependencies.some((dep, i) => dep !== prevDeps.current![i]) : true;

    if (!didRun.current || depsChanged) {
      didRun.current = true;
      prevDeps.current = dependencies;
      return callback();
    }
  }, dependencies);

  return null;
}
