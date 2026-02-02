import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "./email";
import { htmlEmailVerification } from "@/components/email/VerificationEmailTemplate";
import { htmlEmailResetPassword } from "@/components/email/ResetPasswordEmailTemplate";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        subject: "Reset Password",
        userEmail: user.email,
        verificationUrl: url,
        html: await htmlEmailResetPassword({
          userEmail: user.email,
          resetLink: url,
        }),
      });
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        subject: "Verification",
        userEmail: user.email,
        verificationUrl: url,
        html: await htmlEmailVerification({
          userEmail: user.email,
          verificationUrl: url,
        }),
      });
    },
  },
  user: {
    deleteUser: {
      enabled: true,
    },
  },

  plugins: [nextCookies()],
});
