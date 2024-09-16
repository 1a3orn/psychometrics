import { MoreThan } from "typeorm";
import { z } from "zod";
import { Context } from "koa";
import { UserPasswordReset, UserLoginStrategy, User } from "../db/entities/entities";
import { hashPassword } from "../auth/local-password";
import { wrapResult, errorResult } from "../shared-automatic";

const schemaResetPassword = z.object({
  username: z.string().min(1),
  resetCode: z.string().min(1),
  newPassword: z.string().min(8), // Increased minimum password length for security
});

export const resetPasswordRoute = async (ctx: Context) => {
  const result = schemaResetPassword.safeParse(ctx.request.body);

  if (!result.success) {
    console.log("result.error", result.error);
    ctx.body = errorResult("Invalid request");
    return;
  }

  const { username, resetCode, newPassword } = result.data;

  const user = await User.findOne({ where: { username } });

  if (!user) {
    ctx.body = errorResult("User not found");
    return;
  }

  const passwordReset = await UserPasswordReset.findOne({
    where: { usedAt: undefined, resetCode, expiresAt: MoreThan(new Date()) },
    relations: ["user"],
  });

  if (!passwordReset) {
    ctx.body = errorResult("Invalid or expired password reset code");
    return;
  }

  await UserPasswordReset.update({ id: passwordReset.id }, { usedAt: new Date() });

  const hashedPassword = await hashPassword(newPassword);
  const loginStrategy = await UserLoginStrategy.findOne({
    where: { user: { id: passwordReset.user.id }, strategyType: "LOCAL" },
  });

  if (!loginStrategy) {
    ctx.body = errorResult("Login strategy not found");
    return;
  }

  loginStrategy.strategyData = { hashedPassword };
  await loginStrategy.save();

  ctx.body = wrapResult({ message: "Password reset successful" });
};
