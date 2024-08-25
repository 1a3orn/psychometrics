import { Context } from "koa";
import { Run } from "../db/entities/entities";
import { getUserId } from "../auth";

export const routeLatestRuns = async (ctx: Context) => {
  const userId = await getUserId(ctx);
  // Get the most recent run for each task
  const distinctRuns = await Run.createQueryBuilder("run")
    .innerJoinAndSelect("run.task", "task")
    .where("run.user.id = :userId", { userId })
    .orderBy("run.created_at", "DESC")
    .groupBy("task.id")
    .addGroupBy("run.id")
    .getMany();
  ctx.body = distinctRuns;
};
