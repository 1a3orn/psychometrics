import { z } from "zod";

/*
 *  Both download and upload runs
 */
const schemaMeasures = z.record(z.number());

export const schemaRun = z.object({
  id: z.string().optional(),
  key: z.string(),
  startedAt: z.string(),
  endedAt: z.string(),
  metadata: z.record(z.string(), z.any()),
  measures: schemaMeasures,
});

export const schemaRuns = z.array(schemaRun);

/*
 *  Download latest runs
 */
export const schemaLatestRun = z.object({
  key: z.string(),
  date: z.string(),
});

export const schemaLatestRuns = z.array(schemaLatestRun);
