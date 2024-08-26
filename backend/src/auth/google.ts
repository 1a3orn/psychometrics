import { Context } from "koa";

import { Result } from "../types";

import { TokenPayload } from "./tokens";

export type LoginRequestBodyGoogle = {
  type: "GOOGLE";
  token: string;
};

const getErrror = () => ({ ok: false as false, error: "MISSING_USERNAME_OR_PASSWORD" });

export const loginGoogle = async (ctx: Context): Promise<Result<TokenPayload, string>> => {
  return getErrror();
};

export const signupGoogle = async (ctx: Context): Promise<Result<TokenPayload, string>> => {
  return getErrror();
};
