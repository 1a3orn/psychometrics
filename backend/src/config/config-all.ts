import { getStrCfg, getIntCfg } from "./get-env-var";
import { getConfigDb } from "./config-db";

const getConfig = () => {
  const configDb = getConfigDb();
  return {
    nodeEnv: configDb.nodeEnv,
    user: {
      portServer: getIntCfg("USER_PORT"),
      secrets: {
        session: getStrCfg("USER_SESSION_SECRET"),
        token: getStrCfg("USER_TOKEN_SECRET"),
      },
      staticDir: getStrCfg("USER_STATIC_DIR"),
    },
    db: configDb,
  };
};

export const config = getConfig();
