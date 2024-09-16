import Router from "koa-router";

import { resetPasswordRoute } from "./reset-password";
import { resetPasswordLinkRoute } from "./reset-password-link";

export const getUserCommonRoutes = () => {
  const router = new Router().prefix("/api/common");

  router.get("/health", async (ctx) => {
    ctx.body = {
      message: "OK",
    };
  });

  router.post("/reset-password-link", resetPasswordLinkRoute);
  router.post("/reset-password", resetPasswordRoute);

  return router;
};
