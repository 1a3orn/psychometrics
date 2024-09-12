import "reflect-metadata";
import { DataSource } from "typeorm";

import { config } from "../config";

import { User, Admin, UserLoginStrategy, AdminLoginStrategy, Run, Measure } from "./entities/entities";

export const getDataSource = () => {
  return new DataSource({
    type: "postgres",
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.name,
    synchronize: false,
    logging: true,
    entities: [User, Admin, UserLoginStrategy, AdminLoginStrategy, Run, Measure],
    migrations: ["development", "migrations"].includes(config.nodeEnv) ? ["src/db/migrations/**/*.ts"] : [],
    subscribers: ["development", "migrations"].includes(config.nodeEnv) ? ["src/db/subscribers/**/*.ts"] : [],
  });
};

export const AppDataSource = getDataSource();
