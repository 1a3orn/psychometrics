import { Context } from "koa";
import { getUserId } from "../auth";
import { fetchRunsForKey } from "./data-all-key";
import { Parser } from "@json2csv/plainjs";
import { z } from "zod";

const shared = async (ctx: Context) => {
  const userId = await getUserId(ctx);
  const key = z.string().parse(ctx.params.key);

  const allRuns = await fetchRunsForKey(userId, key);
  if (!allRuns.success) return ctx.throw(500, allRuns.error);

  return {
    allRuns: allRuns.value,
    key,
  };
};

export const routeAllKey = async (ctx: Context) => {
  const { allRuns } = await shared(ctx);
  ctx.body = allRuns;
};

export const routeAllKeyCSV = async (ctx: Context) => {
  const { allRuns, key } = await shared(ctx);

  const csv = new Parser().parse(
    allRuns.map((run) => ({
      startedAt: run.startedAt,
      endedAt: run.endedAt,
      ...Object.keys(run.measures).reduce((acc, measureKey) => {
        acc[measureKey] = run.measures[measureKey];
        return acc;
      }, {} as Record<string, number>),
    }))
  );

  ctx.set("Content-Type", "text/csv");
  ctx.set("Content-Disposition", `attachment; filename=${key}_runs.csv`);
  ctx.body = csv;
};
