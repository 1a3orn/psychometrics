import "reflect-metadata";
import { DataSource } from "typeorm";

import { getConfigDb } from "../config";

import {
  User,
  Admin,
  UserLoginStrategy,
  AdminLoginStrategy,
  Run,
  Measure,
  UserPasswordReset,
  AdminPasswordReset,
} from "./entities/entities";

export const getDataSource = () => {
  const config = getConfigDb();
  return new DataSource({
    type: "postgres",
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.name,
    synchronize: false,
    logging: true,
    entities: [User, Admin, UserLoginStrategy, AdminLoginStrategy, Run, Measure, UserPasswordReset, AdminPasswordReset],
    migrations: ["development", "migrations"].includes(config.nodeEnv) ? ["src/db/migrations/**/*.ts"] : [],
    subscribers: ["development", "migrations"].includes(config.nodeEnv) ? ["src/db/subscribers/**/*.ts"] : [],
  });
};

export const AppDataSource = getDataSource();
