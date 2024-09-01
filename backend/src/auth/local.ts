// Core imports
import { Context } from "koa";
import bcrypt from "bcrypt";
import z from "zod";

// Local imports
import { Result, errorResult, wrapResult } from "../shared-automatic";
import { User, UserLoginStrategy } from "../db";
import { getAppDataSource } from "../db/add-datasource";
import { TokenPayload } from "./tokens";

// Constants
const SALT_ROUNDS = 10;
const MIN_PASSWORD_LENGTH = 8;
const MIN_USERNAME_LENGTH = 3;
const MIN_EMAIL_LENGTH = 3;

// Schemas
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

// Helper functions
const getUserFromUsername = async (username: string): Promise<User | null> => {
  return await User.findOne({ where: { username }, relations: { loginStrategies: true } });
};

const getLocalLoginStrategy = (user: User) => {
  return user.loginStrategies.find((strategy) => strategy.strategyType === "LOCAL");
};

const validateCredentials = async (user: User, password: string): Promise<boolean> => {
  const loginStrategy = getLocalLoginStrategy(user);
  const hashedPassword = loginStrategy?.strategyData?.hashedPassword;
  if (!hashedPassword) return false;

  return await bcrypt.compare(password, hashedPassword);
};

// Main functions
export const loginLocal = async (ctx: Context): Promise<Result<TokenPayload>> => {
  const { username, password } = schemaLogin.parse(ctx.request.body);

  const user = await getUserFromUsername(username);
  if (!user) return errorResult("Wrong username or password");

  const isValidPassword = await validateCredentials(user, password);
  if (!isValidPassword) return errorResult("Wrong username or password");

  return wrapResult({ userId: user.id, username: user.username });
};

export const signupLocal = async (ctx: Context): Promise<Result<TokenPayload>> => {
  const { username, password, email } = schemaSignup.parse(ctx.request.body);

  if (password.length < MIN_PASSWORD_LENGTH)
    return errorResult(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
  if (username.length < MIN_USERNAME_LENGTH)
    return errorResult(`Username must be at least ${MIN_USERNAME_LENGTH} characters`);
  if (email.length < MIN_EMAIL_LENGTH) return errorResult(`Email must be at least ${MIN_EMAIL_LENGTH} characters`);

  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) return errorResult("User already exists");

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

  if (!newUser) return errorResult("User creation failed");

  return wrapResult({ userId: newUser.id, username: newUser.username });
};
