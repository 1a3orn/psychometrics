import Router from "koa-router";

export const getUserCommonRoutes = () => {
  const router = new Router().prefix("/api/common");

  return router;
};
