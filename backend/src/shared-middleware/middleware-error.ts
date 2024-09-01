import Koa from 'koa';
import { ZodError } from 'zod';

import { getStrCfg } from '../config';

export const middlewareError: Koa.Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    if (err instanceof ZodError) {
      ctx.status = 400;
      ctx.body = {
        error: {
          message: 'Validation failed',
          details: err.errors.map(e => ({
            path: e.path.join('.'),
            message: e.message
          }))
        }
      };
    } else {
      console.error('Error caught:', err);
      ctx.status = err.status || 500;
    ctx.body = {
      error: {
        message: err.message,
        stack: getStrCfg('NODE_ENV') === 'development' ? err.stack : undefined
      }
      };
    }
  }
};
