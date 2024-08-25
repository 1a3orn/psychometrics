import Koa from 'koa';

export const getApp = (sessionSecret: string) => {
    const app = new Koa();
    app.keys = [sessionSecret];
    return app;
}