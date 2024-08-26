import { useState, useCallback, useEffect, useRef } from "react";

export type AsyncState<T> =
  | { data: T; type: "success"; isRefreshing: boolean }
  | { data: undefined; type: "loading" }
  | { data: undefined; error: Error; type: "failure" };

export function useAsync<T>(asyncFunction: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({
    data: undefined,
    type: "loading",
  });

  const execute = useCallback(
    async (shouldRefresh: boolean = false) => {
      console.log("Executing loading function", shouldRefresh);
      if (shouldRefresh && state.type === "success") {
        setState((prevState) => ({ ...prevState, isRefreshing: true }));
      } else {
        setState({ data: undefined, type: "loading" });
      }

      try {
        const data = await asyncFunction();
        setState({ data, type: "success", isRefreshing: false });
      } catch (error) {
        setState({
          data: undefined,
          error: error instanceof Error ? error : new Error(String(error)),
          type: "failure",
        });
      }
    },
    [asyncFunction, state.type]
  );

  const initialLoadRef = useRef(false);
  useEffect(() => {
    if (!initialLoadRef.current) {
      console.log("initialLoadRef.current", initialLoadRef.current);
      execute(false);
      initialLoadRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reload = useCallback(() => {
    execute(false);
  }, [execute]);

  const refresh = useCallback(() => {
    execute(true);
  }, [execute]);

  return {
    ...state,
    reload,
    refresh,
  };
}
