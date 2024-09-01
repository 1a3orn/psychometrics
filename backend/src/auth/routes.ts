import Router from "koa-router";
import { Context } from "koa";
import { z } from "zod";

import { errorResult, wrapResult } from "../shared-automatic";

import { User } from "../db/entities";
import { loginLocal, signupLocal } from "./local";
import { loginGoogle, signupGoogle } from "./google";
import { signToken } from "./tokens";

const schema = z.object({ type: z.enum(["LOCAL", "GOOGLE"]) });

const methods = {
  LOCAL: { login: loginLocal, signup: signupLocal },
  GOOGLE: { login: loginGoogle, signup: signupGoogle },
};

const handleAuthAction = async (ctx: Context, action: "login" | "signup") => {
  const body = schema.parse(ctx.request.body);

  const tokenPayload = await methods[body.type][action](ctx);

  if (!tokenPayload.success) {
    ctx.body = errorResult(tokenPayload.error);
  } else {
    if (!ctx.session) return errorResult("No session");

    ctx.session.userId = tokenPayload.value.userId;

    const token = signToken(tokenPayload.value);

    ctx.body = wrapResult({ token });
  }
};

export const login = async (ctx: Context) => handleAuthAction(ctx, "login");
export const signup = async (ctx: Context) => handleAuthAction(ctx, "signup");

export const refreshToken = async (ctx: Context) => {
  if (!ctx.session) return ctx.throw(401, "Unauthorized");

  const userId = ctx.session.userId;
  const user = await User.findOne({ where: { id: userId } });
  if (!user) return errorResult("User not found");

  const token = signToken({ userId: user.id, username: user.username });
  ctx.body = wrapResult({ token });
};

export const logout = async (ctx: Context) => {
  ctx.session = null;
  ctx.body = wrapResult({ success: true });
};

export const getAuthRoutes = () => {
  const router = new Router().prefix("/api/auth");
  router.post("/login", login);
  router.post("/signup", signup);
  router.post("/refresh", refreshToken);
  router.post("/logout", logout);
  return router;
};
