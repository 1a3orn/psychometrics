import { Context } from 'koa';
import bcrypt from 'bcrypt';
import z from 'zod';

import { User, UserLoginStrategy } from '../db';
import { Result } from '../types';
import { getAppDataSource } from '../db/add-datasource';

export type LoginRequestBodyLocal = {
    type: "LOCAL"
    username: string;
    password: string;
}
export type SignupRequestBodyLocal = {
    type: "LOCAL"
    username: string;
    password: string;
}

const SALT_ROUNDS = 10;

const getErrror = () => ({ ok: false as false, error: 'MISSING_USERNAME_OR_PASSWORD' });

const schemaLogin = z.object({
    username: z.string(),
    password: z.string(),
});

const schemaSignup = z.object({
    email: z.string(),
    username: z.string(),
    password: z.string(),
});

const getUser = async (username: string): Promise<User | null> => {
    return await User.findOne({ where: { username }, relations: { loginStrategies: true } });
};

const getLocalLoginStrategy = (user: User) => {
    return user.loginStrategies.find(strategy => strategy.strategy_type === 'LOCAL');
};

export const loginLocal = async (ctx: Context): Promise<Result<{ userId: string }, string>> => {

    const { username, password } = schemaLogin.parse(ctx.request.body);

    const user = await getUser(username);
    if (!user) return getErrror();

    const loginStrategy = getLocalLoginStrategy(user);
    const hashedPassword = loginStrategy?.strategy_data?.hashedPassword;
    if (!hashedPassword) return getErrror()

    if (!bcrypt.compare(password, loginStrategy.strategy_data.hashedPassword)) return getErrror();

    return { ok: true, value: { userId: user.id } };
}

export const signupLocal = async (ctx: Context): Promise<Result<{ userId: string }, string>> => {
    
    // Set datasource for User
    

    const { username, password, email } = schemaSignup.parse(ctx.request.body);

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) return { ok: false, error: 'USER_ALREADY_EXISTS' };

    const dataSource = getAppDataSource(ctx);

    let newUser: User | undefined;
    await dataSource.manager.transaction(async (transaction) => {

            newUser = new User();
            newUser.username = username;
            newUser.email = email;
            await transaction.save(newUser);

            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            const loginStrategy = new UserLoginStrategy();
            loginStrategy.strategy_type = 'LOCAL';
            loginStrategy.strategy_data = { hashedPassword };
            loginStrategy.user = newUser;
            await transaction.save(loginStrategy);
    });

    if (!newUser) return { ok: false, error: 'USER_CREATION_FAILED' };

    return { ok: true, value: { userId: newUser.id } };
    
}