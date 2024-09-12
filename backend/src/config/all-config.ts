import { getStrCfg, getIntCfg } from "./get-env-var";

const getConfig = () => {
  return {
    nodeEnv: getStrCfg("NODE_ENV", undefined, ["development", "production"]),
    user: {
      portServer: getIntCfg("USER_PORT"),
      secrets: {
        session: getStrCfg("USER_SESSION_SECRET"),
        token: getStrCfg("USER_TOKEN_SECRET"),
      },
      staticDir: getStrCfg("USER_STATIC_DIR"),
    },
    db: {
      port: getIntCfg("DB_PORT"),
      host: getStrCfg("DB_HOST"),
      username: getStrCfg("DB_USERNAME"),
      password: getStrCfg("DB_PASSWORD"),
      name: getStrCfg("DB_NAME"),
    },
  };
};

export const config = getConfig();
