import { AuthResponse } from "../../api/req-auth";
import { LatestRuns, RunAllKey, RunUpload } from "../../api/req-user";
export type SourceType = "LOCAL_GUEST" | "REMOTE_LOGGED_IN";

export type AuthAwareDataProviderType = {
  source: SourceType;
  fncs: {
    getRunsRecent: () => Promise<LatestRuns[]>;
    getRunsAll: (key: string) => Promise<RunAllKey[]>;
    postRun: (run: RunUpload) => Promise<any>;
  };
};
