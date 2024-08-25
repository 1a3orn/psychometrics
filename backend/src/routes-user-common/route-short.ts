import { Context } from "koa";
import { Task } from "../db/entities/entities";
import { getAppDataSource } from "../db/add-datasource";

export const allTasks = async (ctx: Context) => {
  const dataSource = getAppDataSource(ctx);
  const tasks = await dataSource.getRepository(Task).find();
  ctx.body = tasks;
};
