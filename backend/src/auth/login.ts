import { Context, Middleware } from 'koa';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

import { loginLocal, signupLocal } from './local';
import { loginGoogle, signupGoogle } from './google';
import { getStrCfg } from '../config';
import { Result } from '../types';

const methods = {
    LOCAL: { login: loginLocal, signup: signupLocal },
    GOOGLE: { login: loginGoogle, signup: signupGoogle }
}

const schema = z.object({ type: z.enum(['LOCAL', 'GOOGLE']) });

const signResult = (data: Result<{ userId: string }, string>, ctx: Context) => {
    if (!data.ok) return ctx.throw(401, 'Invalid username or password');

    return jwt.sign({ userId: data.value.userId }, getStrCfg('USER_TOKEN_SECRET'), { expiresIn: '1h' });
}

export const login = async (ctx: Context) => {
    console.log('login', ctx.request.body);
    const body = schema.parse(ctx.request.body);
    const res = await methods[body.type].login(ctx);
    const token = signResult(res, ctx);
    console.log('TOKEN', token);
    ctx.body = { token };
}

export const signup = async (ctx: Context) => {
    console.log('signup', ctx.request.body);
    const body = schema.parse(ctx.request.body);
    const res = await methods[body.type].signup(ctx);
    const token = signResult(res, ctx);
    ctx.body = { token };
}

export const getUserId = async (ctx: Context) => {
    const token = ctx.headers.authorization?.split(' ').pop();
    const decoded = jwt.verify(token || "", getStrCfg('USER_TOKEN_SECRET'));

    if (typeof decoded === 'string') {
        throw new Error('Invalid token');
    }

    if (!decoded.userId) {
        throw new Error('Invalid token');
    }

    return decoded.userId;
}

export const authenticate: Middleware = async (ctx, next) => {
    const token = ctx.headers.authorization?.split(' ').pop();
    try {
        console.log('token', token);
        jwt.verify(token || "", getStrCfg('USER_TOKEN_SECRET'));
        console.log('token verified');
        await next();
    } catch (error) {
        console.log('error', error);
        ctx.throw(401, 'Unauthorized');
    }
}
