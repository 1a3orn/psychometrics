import { Context } from "koa";
import { Run } from "../db/entities/entities";
import { getUserId } from "../auth";

export const routeAllKey = async (ctx: Context) => {
  const userId = await getUserId(ctx);
  const key = ctx.params.key;

  if (!key) ctx.throw(400, "Key is required");
  // Get all runs for some task type
  const allRuns = await Run.createQueryBuilder("run")
    .innerJoinAndSelect("run.task", "task")
    .innerJoinAndSelect("run.measures", "measures")
    .where("run.user.id = :userId", { userId })
    .andWhere("task.key = :key", { key })
    .orderBy("run.created_at", "DESC")
    .getMany();
  ctx.body = allRuns;
};
