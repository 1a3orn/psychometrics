import { z } from "zod";

import { LatestRuns, RunAllKey, RunUpload } from "../../api";
import { AllFncs } from "./types";

const STORAGE_KEY = "localRuns";

const MeasuresSchema = z.record(z.number());

const RunUploadSchema = z.object({
  key: z.string(),
  startedAt: z.string(),
  endedAt: z.string(),
  metadata: z.record(z.any()),
  measures: MeasuresSchema,
});

const RunSchema = RunUploadSchema.extend({
  id: z.string(),
});

const StorageSchema = z.record(z.array(RunSchema));

function getStorageData(): Record<string, RunAllKey[]> {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return {};
  const parsed = JSON.parse(data);
  return StorageSchema.parse(parsed);
}

function setStorageData(data: Record<string, RunAllKey[]>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const localStorageImpl: AllFncs = {
  getRunsRecent: async () => {
    const allRuns = getStorageData();
    const latestRuns: LatestRuns[] = Object.entries(allRuns).map(([key, runs]) => ({
      key,
      date: runs[runs.length - 1].endedAt,
    }));
    // Sort the runs by date in descending order
    latestRuns.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    // Create a Map to store the most recent run for each key
    const uniqueLatestRuns = new Map<string, LatestRuns>();
    // Iterate through the sorted runs and keep only the first (most recent) occurrence of each key
    latestRuns.forEach((run) => {
      if (!uniqueLatestRuns.has(run.key)) {
        uniqueLatestRuns.set(run.key, run);
      }
    });
    // Convert the Map back to an array
    return Array.from(uniqueLatestRuns.values());
  },

  getRunsAll: async (key: string) => {
    const allRuns = getStorageData();
    console.log("allRuns", allRuns);
    return allRuns[key] || [];
  },

  postRun: async (run: RunUpload) => {
    const validatedRun = RunUploadSchema.parse(run);
    const allRuns = getStorageData();
    const newRun: RunAllKey = {
      ...validatedRun,
      id: Date.now().toString(), // Simple ID generation
    };

    if (!allRuns[run.key]) {
      allRuns[run.key] = [];
    }
    allRuns[run.key].push(newRun);
    setStorageData(allRuns);
    return newRun;
  },
};
