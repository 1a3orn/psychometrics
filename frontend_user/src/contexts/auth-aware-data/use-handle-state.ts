import { useMemo } from "react";
import { apiGetRunsRecent, apiGetRunsAll, apiPostRun, apiPostRuns } from "../../api/req-user";

import { AuthAwareDataProviderType, SourceType } from "./types";
import { useUser } from "../user";

import { localStorageImpl } from "./local-storage-data";

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
        postRuns: apiPostRuns,
      };
    } else {
      return localStorageImpl;
    }
  }, [providerType]);

  return {
    source: providerType,
    fncs,
  };
};
