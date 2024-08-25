import { Context, Middleware } from 'koa';
import { DataSource } from 'typeorm';
import { getDataSource } from './db';

export const getAddDataSourceToContext: () => Promise<Middleware> = async () => {
    const dataSource = getDataSource();
    await dataSource.initialize();
    return async (ctx, next) => {
        ctx.appDataSource = dataSource;
        await next();
    };
};

export const getAppDataSource = (ctx: Context) => {
    if (!ctx.appDataSource) {
        throw new Error('AppDataSource is not attached to the context');
    }
    return ctx.appDataSource as DataSource;
};
