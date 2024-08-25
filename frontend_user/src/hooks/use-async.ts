import { useState, useCallback, useEffect } from "react";

type AsyncState<T> =
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
    [asyncFunction]
  );

  // Onload
  useEffect(() => {
    execute(false);
  }, [execute]);

  const reload = useCallback(() => {
    execute(false);
  }, [execute]);

  const refresh = useCallback(() => {
    execute(true);
  }, [execute, state.type]);

  return {
    ...state,
    reload,
    refresh,
  };
}
