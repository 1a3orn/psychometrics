import { Context } from "koa";
import { Run } from "../db/entities/entities";
import { getUserId } from "../auth";

export const routeLatestRuns = async (ctx: Context) => {
  const userId = await getUserId(ctx);
  // Get the most recent run for each task
  const distinctRuns = await Run.createQueryBuilder("run")
    .innerJoinAndSelect("run.task", "task")
    .where("run.user.id = :user_id", { user_id: userId })
    .andWhere((qb) => {
      const subQuery = qb
        .subQuery()
        .select("MAX(r.created_at)")
        .from(Run, "r")
        .where("r.task.id = run.task.id")
        .getQuery();
      return "run.created_at = " + subQuery;
    })
    .orderBy("run.created_at", "DESC")
    .getMany();
  ctx.body = distinctRuns.map((run) => ({
    key: run.task.key,
    mostRecentRunDate: run.createdAt,
  }));
};
