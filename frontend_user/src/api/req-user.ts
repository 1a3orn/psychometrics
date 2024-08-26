import { client } from "./client";
import { Run, Measure } from "./base-types";

export type LatestRuns = {
  key: string;
  mostRecentRunDate: string;
};

export const getLatestRuns = async () => (await client.get<LatestRuns[]>("/user/latest-runs")).data;

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

export const postUploadMeasure = async (run: RunUpload) => (await client.post("/user/upload-run", run)).data;

export type RunAllKey = Run & {
  task: {
    key: string;
  };
  measures: Array<Measure>;
};

export const getAllKey = async (key: string): Promise<RunAllKey[]> =>
  (await client.get<RunAllKey[]>(`/user/all-key/${key}`)).data;
