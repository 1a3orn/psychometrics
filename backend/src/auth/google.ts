import { Context } from "koa";

import { Result, errorResult, wrapResult } from "../shared-automatic";

import { TokenPayload } from "./tokens";

export type LoginRequestBodyGoogle = {
  type: "GOOGLE";
  token: string;
};

export const loginGoogle = async (ctx: Context): Promise<Result<TokenPayload>> => {
  return errorResult("Not implemented");
};

export const signupGoogle = async (ctx: Context): Promise<Result<TokenPayload>> => {
  return errorResult("Not implemented");
};
