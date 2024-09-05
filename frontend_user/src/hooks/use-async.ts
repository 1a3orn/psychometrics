import { useState, useCallback } from "react";
import { useEffectOnce } from "./use-effect-once";

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
        console.log("Executing async function");
        const data = await asyncFunction();
        console.log("Async function executed");
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

  useEffectOnce(() => {
    console.log("useEffectOnce");
    execute(true);
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
