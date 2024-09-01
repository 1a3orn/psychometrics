import { getStrCfg } from "./config";
import { serveStatic } from "./shared-middleware";
import { getUserCommonRoutes } from "./routes-user-common";
import { getUserSpecificRoutes } from "./routes-user-specific";
import { getAuthRoutes } from "./auth";
import { getApp, decorateRoutes } from "./app-get";

export const appUser = async () => {
  //
  // 1. Get generic app that can be used for
  //    user + CMS server
  const app = await getApp({
    sessionSecret: getStrCfg("USER_SESSION_SECRET"),
  });

  //
  // 2. Add the user routes
  //
  decorateRoutes(app, [
    //   /auth
    getAuthRoutes(),
    //   /user
    getUserCommonRoutes(),
    //   /common
    getUserSpecificRoutes(),
  ]);

  // To dump????
  app.use(
    serveStatic({
      folder: getStrCfg("USER_STATIC_DIR"),
      route: "/",
    })
  );

  return app;
};
