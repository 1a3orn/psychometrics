import { useMemo } from "react";
import { apiGetRunsRecent, apiGetRunsAll, apiPostRun } from "../../api/req-user";

import { AuthAwareDataProviderType, SourceType } from "./types";
import { useUser } from "../user";

export const useHandleState = (): AuthAwareDataProviderType => {
  const { state } = useUser();

  const providerType: SourceType = useMemo(() => {
    if (state.type === "LOGGED_IN") {
      return "REMOTE_LOGGED_IN";
    } else {
      return "LOCAL_GUEST";
    }
  }, [state]);

  const fncs = useMemo(() => {
    if (providerType === "REMOTE_LOGGED_IN") {
      return {
        getRunsRecent: apiGetRunsRecent,
        getRunsAll: apiGetRunsAll,
        postRun: apiPostRun,
      };
    } else {
      return {
        getRunsRecent: () => Promise.resolve([]),
        getRunsAll: () => Promise.resolve([]),
        postRun: () => Promise.resolve({}),
      };
    }
  }, [providerType]);

  return {
    source: providerType,
    fncs,
  };
};
