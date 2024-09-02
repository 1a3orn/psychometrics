import { Context } from "koa";
import { Run } from "../db/entities/entities";
import { getUserId } from "../auth";

export const routeLatestRuns = async (ctx: Context) => {
  const userId = await getUserId(ctx);

  const distinctRuns = await Run.createQueryBuilder("run")
    .where("run.user.id = :user_id", { user_id: userId })
    .andWhere((qb) => {
      const subQuery = qb
        .subQuery()
        .select("MAX(run.createdAt)", "maxDate")
        .from(Run, "run")
        .where("run.user.id = :user_id")
        .groupBy("run.key")
        .getQuery();
      return "run.createdAt IN " + subQuery;
    })
    .setParameter("user_id", userId)
    .getMany();

  ctx.body = distinctRuns.map((run) => ({
    key: run.key,
    date: run.createdAt,
  }));
};
