import { client } from "./client";
import { Run } from "./base-types";

export type LatestRuns = {
  key: string;
  date: string;
};

export const apiGetRunsRecent = async () => (await client.get<LatestRuns[]>("/user/latest-runs")).data;

export type RunUpload = {
  id?: string | null;
  key: string;
  startedAt: string;
  endedAt: string;
  metadata: Record<string, any>;
  measures: Measures;
};

type Measures = Record<string, number>;

export const apiPostRun = async (run: RunUpload) => (await client.post("/user/upload-run", run)).data;

export const apiPostRuns = async (runs: RunUpload[]) => (await client.post("/user/upload-multiple-runs", runs)).data;

export type RunAllKey = Run & {
  measures: Measures;
};

export const apiGetRunsAll = async (key: string): Promise<RunAllKey[]> =>
  (await client.get<RunAllKey[]>(`/user/all-key/${key}`)).data;
