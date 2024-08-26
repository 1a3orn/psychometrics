import { Context } from "koa";
import { Task, Run, Measure, User } from "../db/entities/entities";

import { z } from "zod";
import { getUserId } from "../auth";
import { getAppDataSource } from "../db/add-datasource";

const schema = z.object({
  key: z.string(),
  startedAt: z.string(),
  endedAt: z.string(),
  metadata: z.record(z.string(), z.any()),
  measures: z.array(
    z.object({
      key: z.string(),
      number: z.number(),
    })
  ),
});

export const routeUploadRun = async (ctx: Context) => {
  const dataSource = getAppDataSource(ctx);

  const userId = await getUserId(ctx);
  const body = schema.parse(ctx.request.body);

  // 1. Get task
  const task = await Task.findOne({ where: { key: body.key } });
  if (!task) return ctx.throw(404, "Task not found");

  await dataSource.manager.transaction(async (transaction) => {
    const run = new Run();
    run.startedAt = new Date(body.startedAt);
    run.endedAt = new Date(body.endedAt);
    run.metadata = body.metadata;
    run.task = task;
    run.user = { id: userId } as User;
    await transaction.save(run);

    const measures = body.measures.map((measure) => {
      const m = new Measure();
      m.key = measure.key;
      m.number = measure.number;
      m.run = run;
      return m;
    });
    await transaction.save(measures);
  });

  ctx.body = { success: true };
};
