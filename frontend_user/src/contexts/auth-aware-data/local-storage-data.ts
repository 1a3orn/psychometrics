import { z } from "zod";

import { schemaLatestRuns, schemaRun } from "../../shared-automatic";

import { LatestRuns, RunAllKey, RunUpload } from "../../api";
import { AllFncs } from "./types";

const STORAGE_KEY = "localRuns";

const StorageSchema = z.record(z.array(schemaRun));

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
    const values = Array.from(uniqueLatestRuns.values());
    return schemaLatestRuns.parse(values);
  },

  getRunsAll: async (key: string) => {
    const allRuns = getStorageData();
    return allRuns[key] || [];
  },

  postRun: async (run: RunUpload) => {
    const validatedRun = schemaRun.parse(run);
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

  postRuns: async (runs: RunUpload[]) => {
    const validatedRuns = runs.map((run) => schemaRun.parse(run));
    const allRuns = getStorageData();
    validatedRuns.forEach((run) => {
      if (!allRuns[run.key]) {
        allRuns[run.key] = [];
      }
      allRuns[run.key].push(run);
    });
    setStorageData(allRuns);
    return validatedRuns;
  },
};
