import { getIntCfg, getStrCfg } from "./get-env-var";

export const getConfigDb = () => {
  return {
    port: getIntCfg("DB_PORT"),
    host: getStrCfg("DB_HOST"),
    username: getStrCfg("DB_USERNAME"),
    password: getStrCfg("DB_PASSWORD"),
    name: getStrCfg("DB_NAME"),
    nodeEnv: getStrCfg("NODE_ENV", undefined, ["development", "production", "migrations"]),
  };
};
