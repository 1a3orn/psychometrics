import 'reflect-metadata'
import { DataSource } from "typeorm"

import { getStrCfg, getIntCfg } from "../config";

import { User, Admin, UserLoginStrategy, AdminLoginStrategy, Task, Run, Measure } from "./entities/entities";

export const getDataSource = () => {
    return new DataSource({
        type: "postgres",
        host: "localhost",
        port: getIntCfg('DB_PORT'),
        username: getStrCfg('DB_USERNAME'),
        password: getStrCfg('DB_PASSWORD'),
        database: getStrCfg('DB_NAME'),
        synchronize: false,
        logging: true,
        entities: [User, Admin, UserLoginStrategy, AdminLoginStrategy, Task, Run, Measure],
        migrations: ["src/db/migrations/**/*.ts"],
        subscribers: ["src/db/subscribers/**/*.ts"],
    })
}

export const AppDataSource = getDataSource();

