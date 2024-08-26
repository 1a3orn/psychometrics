import { Context } from "koa";
import bcrypt from "bcrypt";
import z from "zod";

import { User, UserLoginStrategy } from "../db";
import { Result } from "../types";
import { getAppDataSource } from "../db/add-datasource";

import { TokenPayload } from "./tokens";

const SALT_ROUNDS = 10;

const getErrror = () => ({ ok: false as false, error: "MISSING_USERNAME_OR_PASSWORD" });

const schemaLogin = z.object({
  type: z.literal("LOCAL"),
  username: z.string(),
  password: z.string(),
});

const schemaSignup = schemaLogin.extend({
  email: z.string(),
});

export type LoginRequestBodyLocal = z.infer<typeof schemaLogin>;
export type SignupRequestBodyLocal = z.infer<typeof schemaSignup>;

const getUserFromUsername = async (username: string): Promise<User | null> => {
  return await User.findOne({ where: { username }, relations: { loginStrategies: true } });
};

const getLocalLoginStrategy = (user: User) => {
  return user.loginStrategies.find((strategy) => strategy.strategyType === "LOCAL");
};

export const loginLocal = async (ctx: Context): Promise<Result<TokenPayload, string>> => {
  const { username, password } = schemaLogin.parse(ctx.request.body);

  const user = await getUserFromUsername(username);
  if (!user) return getErrror();

  const loginStrategy = getLocalLoginStrategy(user);
  const hashedPassword = loginStrategy?.strategyData?.hashedPassword;
  if (!hashedPassword) return getErrror();

  if (!bcrypt.compare(password, loginStrategy.strategyData.hashedPassword)) return getErrror();

  return { ok: true, value: { userId: user.id, username: user.username } };
};

export const signupLocal = async (ctx: Context): Promise<Result<TokenPayload, string>> => {
  // Set datasource for User

  const { username, password, email } = schemaSignup.parse(ctx.request.body);

  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) return { ok: false, error: "USER_ALREADY_EXISTS" };

  const dataSource = getAppDataSource(ctx);

  let newUser: User | undefined;
  await dataSource.manager.transaction(async (transaction) => {
    newUser = new User();
    newUser.username = username;
    newUser.email = email;
    await transaction.save(newUser);

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const loginStrategy = new UserLoginStrategy();
    loginStrategy.strategyType = "LOCAL";
    loginStrategy.strategyData = { hashedPassword };
    loginStrategy.user = newUser;
    await transaction.save(loginStrategy);
  });

  if (!newUser) return { ok: false, error: "USER_CREATION_FAILED" };

  return { ok: true, value: { userId: newUser.id, username: newUser.username } };
};
