import crypto from "crypto";
import { z } from "zod";
import { Context } from "koa";
import { User, UserPasswordReset } from "../db/entities/entities";
import { errorResult, wrapResult } from "../shared-automatic";

const schema = z.object({
  email: z.string().min(1),
  username: z.string().min(1),
});

export const resetPasswordLinkRoute = async (ctx: Context) => {
  const result = schema.safeParse(ctx.request.body);

  if (!result.success) {
    ctx.body = errorResult("Missing email or username");
    return;
  }

  const { email, username } = result.data;

  const user = await User.findOne({ where: { email, username } });

  if (!user) {
    ctx.body = errorResult("User not found");
    return;
  }

  const resetCode = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now

  const upr = await UserPasswordReset.create({
    user,
    resetCode,
    expiresAt,
    ipAddress: ctx.ip || "",
    userAgent: ctx.headers["user-agent"] || "",
  });
  await upr.save();

  const resetLink = `https://yourdomain.com/reset-password?code=${resetCode}&username=${username}`;

  // TODO: Replace console.log with actual email sending logic
  console.log({
    to: user.email,
    from: "noreply@yourdomain.com",
    subject: "Password Reset Request",
    text: `Click the following link to reset your password: ${resetLink}`,
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });

  ctx.body = wrapResult({ message: "Password reset email sent" });
};
