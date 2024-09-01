import Koa from "koa";
import Router from "koa-router";
import session from "koa-session";
import bodyParser from "koa-bodyparser";

import { middlewareError, middlewareLogger } from "./shared-middleware";
import { getAddDataSourceToContext } from "./db/add-datasource";

export const getApp = async ({ sessionSecret }: { sessionSecret: string }) => {
  const app = new Koa();
  app.keys = [sessionSecret];

  const sessionConfig = {
    rolling: false,
    signed: true,
  };

  app.use(middlewareError);
  app.use(middlewareLogger());
  app.use(await getAddDataSourceToContext());
  app.use(session(sessionConfig, app));
  app.use(bodyParser());
  app.use(async (ctx, next) => {
    // Count session views
    if (ctx.session) {
      ctx.session.views = (ctx.session.views || 0) + 1;
    }
    console.log("session", ctx.session);
    await next();
  });

  return app;
};

export const decorateRoutes = (app: Koa, routes: Router[]) => {
  routes.forEach((r) => {
    app.use(r.routes()).use(r.allowedMethods());
  });
};
