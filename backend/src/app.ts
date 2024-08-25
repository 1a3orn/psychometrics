import bodyParser from "koa-bodyparser";
import session from "koa-session";
import cors from "@koa/cors";

import { getStrCfg } from "./config";
import { middlewareError, middlewareLogger, serveStatic } from "./shared";
import { getAddDataSourceToContext } from "./db/add-datasource";
import { getUserCommonRoutes } from "./routes-user-common";
import { getUserSpecificRoutes } from "./routes-user-specific";
import { getAuthRoutes } from "./routes-auth";
import { getApp } from "./app-get";

export const appUser = async () => {
  const app = getApp(getStrCfg("USER_SESSION_SECRET"));

  app.use(middlewareError);
  app.use(middlewareLogger());
  app.use(await getAddDataSourceToContext());
  app.use(session(app));
  app.use(bodyParser());
  app.use(cors());

  // Prefix   /auth            /user                  /common
  const rs = [getAuthRoutes(), getUserCommonRoutes(), getUserSpecificRoutes()];
  rs.forEach((r) => {
    app.use(r.routes()).use(r.allowedMethods());
  });

  app.use(
    serveStatic({
      folder: getStrCfg("USER_STATIC_DIR"),
      route: "/",
    })
  );

  return app;
};
