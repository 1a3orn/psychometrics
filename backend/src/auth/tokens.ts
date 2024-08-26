import { Context, Middleware } from "koa";
import jwt from "jsonwebtoken";

import { getStrCfg } from "../config";

export type TokenPayload = {
  userId: string;
  username: string;
};

export const signToken = (data: TokenPayload, ctx: Context) => {
  const payload = { userId: data.userId, username: data.username };

  return jwt.sign(payload, getStrCfg("USER_TOKEN_SECRET"), { expiresIn: "15s" });
};

export const verifyToken = (token: string) => {
  const result = jwt.verify(token, getStrCfg("USER_TOKEN_SECRET"));

  console.log("result", result);

  if (typeof result === "string") throw new Error("Invalid token");

  if (!result.userId || !result.username) {
    throw new Error("Invalid token: missing userId or username");
  }

  return result as TokenPayload;
};

export const authenticate: Middleware = async (ctx, next) => {
  const token = getTokenFromHeader(ctx);
  try {
    console.log("token", token);
    verifyToken(token);
    await next();
  } catch (error) {
    console.log("error", error);
    ctx.throw(401, "Unauthorized");
  }
};

export const getTokenFromHeader = (ctx: Context) => {
  const authorization = ctx.headers.authorization;
  if (!authorization) throw new Error("Missing token");

  const split = authorization.split(" ");
  if (!split) throw new Error("Missing token");

  if (split.length !== 2) throw new Error("Authorization header must be in the format of 'Bearer <token>'");

  if (!split[1]) throw new Error("Missing token");
  return split[1];
};

export const getUserId = async (ctx: Context) => {
  const token = getTokenFromHeader(ctx);
  const decoded = verifyToken(token);
  return decoded.userId;
};
