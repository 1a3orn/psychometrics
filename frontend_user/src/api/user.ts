import { client } from "./client";

export const latestRuns = async () => {
  const data = await client.get("/user/latest-runs");
  console.log(data);
  return data;
};

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

export const uploadMeasure = async (run: RunUpload) => {
  const data = await client.post("/user/upload-run", run);
  console.log(data);
  return data;
};

export type Runs = {
  id: string;
  created_at: string;
  started_at: string;
  ended_at: string;
  task: {
    key: string;
  };
  measures: Array<{
    key: string;
    number: number;
  }>;
};

export const allKey = async (key: string): Promise<Runs[]> => {
  const data = await client.get<Runs[]>(`/user/all-key/${key}`);
  console.log(data);
  return data.data;
};
