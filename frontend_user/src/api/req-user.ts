import { client } from "./client";
import { Run, Measure } from "./base-types";

export type LatestRuns = {
  key: string;
  date: string;
};

export const apiGetRunsRecent = async () => (await client.get<LatestRuns[]>("/user/latest-runs")).data;

export type RunUpload = {
  key: string;
  startedAt: string;
  endedAt: string;
  metadata: Record<string, any>;
  measures: Array<{
    key: string;
    number: number;
  }>;
};

export const apiPostRun = async (run: RunUpload) => (await client.post("/user/upload-run", run)).data;

export type RunAllKey = Run & {
  measures: Record<string, number>;
};

export const apiGetRunsAll = async (key: string): Promise<RunAllKey[]> =>
  (await client.get<RunAllKey[]>(`/user/all-key/${key}`)).data;
