import { Context } from "koa";
import { Run } from "../db/entities/entities";
import { TASKS, schemaRuns } from "../shared-automatic";
import { getUserId } from "../auth";
import { dbRunToRun } from "./run-to-record";

const isNotNull = <T>(value: T | null): value is T => value !== null;

export const routeAllKey = async (ctx: Context) => {
  const userId = await getUserId(ctx);
  const key = ctx.params.key;

  if (!key) ctx.throw(400, "Key is required");

  const taskProto = TASKS.find((task) => task.key === key);
  if (!taskProto) return ctx.throw(404, "Task not found");

  // Get all runs for some task type
  const allRuns = await Run.createQueryBuilder("run")
    .where("run.user.id = :userId", { userId })
    .innerJoinAndSelect("run.measures", "measures")
    .andWhere("run.key = :key", { key })
    .orderBy("run.created_at", "ASC")
    .getMany();

  const formattedRuns = allRuns.map(dbRunToRun).filter(isNotNull);

  ctx.body = schemaRuns.parse(formattedRuns);
};
