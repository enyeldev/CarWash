import { User } from "@/src/generated/prisma/client";
import { auth } from "@/src/lib/auth";
import { ValidationAppError } from "@/src/lib/errors";
import { prisma } from "@/src/lib/prisma";
import {
  forgotPasswordSchema,
  logInFormSchema,
  resetPasswordSchema,
  signUpFormSchema,
} from "@/src/schema/auth";
import { SocialAuthProviders } from "@/src/types/auth";
import {} from "better-auth";
import { headers } from "next/headers";

type AuthServiceType = {
  provider: SocialAuthProviders;
  userId: User["id"];
  userEmail: User["email"];
};

export async function signUpWithEmailService(data: unknown) {
  const result = signUpFormSchema.safeParse(data);
  if (!result.success) {
    throw new ValidationAppError(result.error.issues, "Error de schema");
  }

  const { email, fullName, password } = result.data;

  const resposne = await auth.api.signUpEmail({
    body: {
      email,
      name: fullName,
      password,
      callbackURL: "/onboarding",
    },
  });

  return resposne;
}

export async function singInWithEmailService(data: unknown) {
  const result = logInFormSchema.safeParse(data);
  if (!result.success) {
    throw new ValidationAppError(result.error.issues, "Error de schema");
  }

  const { email, password, rememberMe } = result.data;

  const response = await auth.api.signInEmail({
    body: {
      email,
      password,
      rememberMe,
    },
  });

  return response;
}

export async function signInWithSocialService({
  provider,
}: Pick<AuthServiceType, "provider">) {
  const resposne = await auth.api.signInSocial({
    body: {
      provider,
      newUserCallbackURL: "/onboarding",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
    },
  });

  return resposne;
}

export async function forgotPasswordEmailService(data: unknown) {
  const result = forgotPasswordSchema.safeParse(data);
  if (!result.success) {
    throw new ValidationAppError(result.error.issues, "Error de schema");
  }

  const response = await auth.api.requestPasswordReset({
    body: {
      email: result.data.email,
      redirectTo: "/change-password",
    },
  });

  return response;
}

export async function resetPasswordService(data: unknown) {
  const result = resetPasswordSchema.safeParse(data);
  if (!result.success) {
    throw new ValidationAppError(result.error.issues, "Error de schema");
  }

  const {
    data: { password, token },
  } = result;

  const response = await auth.api.resetPassword({
    body: {
      newPassword: password,
      token,
    },
  });

  return response;
}

// User
export async function userHasCompanyService({
  userId,
}: Pick<AuthServiceType, "userId">) {
  const response = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      companyUsers: true,
    },
  });

  return response;
}

// Session

export async function getSessionService() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}
