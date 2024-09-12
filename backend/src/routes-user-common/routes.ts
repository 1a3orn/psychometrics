import Router from "koa-router";

export const getUserCommonRoutes = () => {
  const router = new Router().prefix("/api/common");

  router.get("/health", async (ctx) => {
    ctx.body = {
      message: "OK",
    };
  });

  return router;
};
