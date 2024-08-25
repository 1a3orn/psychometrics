import Router from "koa-router";

import { allTasks } from "./route-short";

export const getUserCommonRoutes = () => {
  const router = new Router().prefix("/common");

  router.get("/all-tasks", allTasks);

  return router;
};
