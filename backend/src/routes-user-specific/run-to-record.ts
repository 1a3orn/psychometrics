import { Run, Measure } from "../db/entities/entities";

type RunView = {
  id: string;
  key: string;
  startedAt: Date;
  endedAt: Date;
  metadata: Record<string, any>;
  measures: Record<string, number>;
};

export const runToRecord = (run: Run & { measures?: Measure[] }): RunView | null => {
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
    measures: measuresAsObject,
  };
};
