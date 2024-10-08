
import { Middleware } from 'koa';

export const middlewareLogger: () => Middleware = () => {
    return async (ctx, next) => {
        const start = new Date();
        await next();
        const ms = new Date().getTime() - start.getTime();
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    }
};
