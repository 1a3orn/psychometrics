import Router from "koa-router";

import { allTasks } from "./route-short";

export const getUserCommonRoutes = () => {
  const router = new Router().prefix("/api/common");

  router.get("/all-tasks", allTasks);

  return router;
};
