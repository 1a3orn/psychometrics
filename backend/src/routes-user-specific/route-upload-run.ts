import { Context } from "koa";
import { schemaRun, schemaRuns } from "../shared-automatic";
import { getUserId } from "../auth";
import { getAppDataSource } from "../db/add-datasource";
import { processRun } from "./data-process-run";

export const routeUploadRun = async (ctx: Context) => {
  const userId = await getUserId(ctx);
  const body = schemaRun.safeParse(ctx.request.body);

  if (!body.success) return ctx.throw(400, body.error);

  const result = await getAppDataSource(ctx).manager.transaction(async (transaction) => {
    return processRun(body.data, userId, transaction);
  });

  ctx.body = { success: result.success };
};

export const routeUploadMultipleRuns = async (ctx: Context) => {
  const userId = await getUserId(ctx);
  const bodies = schemaRuns.safeParse(ctx.request.body);

  if (!bodies.success) return ctx.throw(400, bodies.error);

  const results = await getAppDataSource(ctx).manager.transaction(async (transaction) => {
    return Promise.all(bodies.data.map((body) => processRun(body, userId, transaction)));
  });

  ctx.body = {
    success: results.filter((r) => r.success).length,
  };
};
