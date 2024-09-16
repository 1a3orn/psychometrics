import Router from "koa-router";
import { authenticate } from "../auth";

import { routeUploadRun } from "./route-upload-run";
import { routeLatestRuns } from "./route-latest-runs";
import { routeAllKey, routeAllKeyCSV } from "./route-all-type";

export const getUserSpecificRoutes = () => {
  const router = new Router().prefix("/api/user");
  router.use(authenticate);
  router.post("/upload-run", routeUploadRun);
  router.get("/latest-runs", routeLatestRuns);

  router.get("/all-key/:key/csv", routeAllKeyCSV);
  router.get("/all-key/:key", routeAllKey);
  return router;
};
