import { SubmitValues } from "../../types";

export type Run = {
  key: string;
  startedAt: string;
  endedAt: string;
  metadata: object;
  measures: Record<string, number>;
};

export type RunWithExtra = Omit<Run, "measures"> & {
  measuresPretty: SubmitValues;
  selected: boolean;
};
