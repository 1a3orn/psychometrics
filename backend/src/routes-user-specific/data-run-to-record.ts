import { Run, Measure } from "../db/entities/entities";

export type RunView = {
  id: string;
  key: string;
  startedAt: string;
  endedAt: string;
  metadata: Record<string, any>;
  measures: Record<string, number>;
};

export const dbRunToRun = (run: Run & { measures?: Measure[] }): RunView | null => {
  if (!run.measures) {
    console.error("Run has no measures", run);
    return null;
  }

  const measuresAsObject = run.measures.reduce((acc, measure) => {
    acc[measure.key] = measure.number;
    return acc;
  }, {} as Record<string, number>);

  return {
    ...run,
    startedAt: run.createdAt.toISOString(),
    endedAt: run.endedAt?.toISOString(),
    measures: measuresAsObject,
  };
};
