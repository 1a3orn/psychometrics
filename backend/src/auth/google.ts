import { Context } from 'koa';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from '../db';
import { Result } from '../types';


export type LoginRequestBodyGoogle = {
    type: "GOOGLE"
    token: string;
}

const SALT_ROUNDS = 10;

const getErrror = () => ({ ok: false as false, error: 'MISSING_USERNAME_OR_PASSWORD' });

export const loginGoogle = async (ctx: Context): Promise<Result<{ userId: string }, string>> => {

    return getErrror();
}

export const signupGoogle = async (ctx: Context): Promise<Result<{ userId: string }, string>> => {
    return getErrror();
}