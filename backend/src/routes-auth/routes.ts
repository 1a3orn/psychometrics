import Router from 'koa-router';
import { login, signup } from '../auth';

export const getAuthRoutes = () => {
    const router = new Router().prefix('/api/auth');
    router.post('/login', login);
    router.post('/signup', signup);
    return router;
}