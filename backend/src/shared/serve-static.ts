import Router from 'koa-router';

import mount from 'koa-mount';
import serve from 'koa-static';


export const serveStatic = ({
    folder,
    route
}: {
    folder: string;
    route: string;
}) => {
    const router = new Router();
    
    // Use koa-mount to prefix the static middleware with the desired route
    router.get(new RegExp(`^${route}(.*)`), mount(route, serve(folder)));
    
    return router.routes();
};