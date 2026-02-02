import {
  forgotPasswordSchema,
  logInFormSchema,
  resetPasswordSchema,
  signUpFormSchema,
} from "@/src/schema/auth";
import { auth } from "@/src/lib/auth";
import { z } from "zod";

export type LoginFormType = z.infer<typeof logInFormSchema>;

export type SignUpFormType = z.infer<typeof signUpFormSchema>;

export type SignUpResponse = Awaited<ReturnType<typeof auth.api.signUpEmail>>;

export type SignInResponse = Awaited<ReturnType<typeof auth.api.signInEmail>>;

export type SocialAuthProviders = "google";

export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
