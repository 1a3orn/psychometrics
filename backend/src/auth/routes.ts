import Router from "koa-router";
import { Context } from "koa";
import { z } from "zod";

import { User } from "../db/entities";
import { loginLocal, signupLocal } from "./local";
import { loginGoogle, signupGoogle } from "./google";
import { signToken } from "./tokens";

const methods = {
  LOCAL: { login: loginLocal, signup: signupLocal },
  GOOGLE: { login: loginGoogle, signup: signupGoogle },
};

const schema = z.object({ type: z.enum(["LOCAL", "GOOGLE"]) });

export const login = async (ctx: Context) => {
  const body = schema.parse(ctx.request.body);
  const tokenPayload = await methods[body.type].login(ctx);

  if (!tokenPayload.ok) return ctx.throw(400, tokenPayload.error);

  if (ctx.session) {
    ctx.session.userId = tokenPayload.value.userId;
  }

  ctx.body = { token: signToken(tokenPayload.value, ctx) };
};

export const signup = async (ctx: Context) => {
  const body = schema.parse(ctx.request.body);
  const tokenPayload = await methods[body.type].signup(ctx);

  if (!tokenPayload.ok) return ctx.throw(400, tokenPayload.error);

  if (ctx.session) {
    ctx.session.userId = tokenPayload.value.userId;
  }

  ctx.body = { token: signToken(tokenPayload.value, ctx) };
};

export const refreshToken = async (ctx: Context) => {
  if (!ctx.session) return ctx.throw(401, "Unauthorized");

  const userId = ctx.session.userId;
  const user = await User.findOne({ where: { id: userId } });
  if (!user) return ctx.throw(401, "Unauthorized");

  ctx.body = { token: signToken({ userId: user.id, username: user.username }, ctx) };
};

export const logout = async (ctx: Context) => {
  ctx.session = null;
  ctx.body = { success: true };
};

export const getAuthRoutes = () => {
  const router = new Router().prefix("/api/auth");
  router.post("/login", login);
  router.post("/signup", signup);
  router.post("/refresh", refreshToken);
  router.post("/logout", logout);
  return router;
};
