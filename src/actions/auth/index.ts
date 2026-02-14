"use server";

import { User } from "@/src/generated/prisma/client";
import {
  ActionResult,
  mapErrorToPayload,
  UnauthorizedError,
} from "@/src/lib/errors";

import {
  forgotPasswordEmailService,
  getSessionService,
  resetPasswordService,
  signInWithSocialService,
  signUpWithEmailService,
  singInWithEmailService,
  userHasCompanyService,
} from "@/src/services/auth";
import {
  SignInResponse,
  SignUpResponse,
  SocialAuthProviders,
} from "@/src/types/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export async function signUpWithEmailAction(
  data: unknown,
): Promise<ActionResult<SignUpResponse>> {
  try {
    const result = await signUpWithEmailService(data);
    return { ok: true, data: result };
  } catch (error) {
    return { ok: false, error: mapErrorToPayload(error) };
  }
}

export async function signInWithEmailAction(
  data: unknown,
): Promise<ActionResult<SignInResponse>> {
  try {
    const result = await singInWithEmailService(data);
    await userHasCompanyAction({ userId: result.user.id });

    return { ok: true, data: result };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { ok: false, error: mapErrorToPayload(error) };
  }
}

export async function signInWithSocialAction({
  provider,
}: {
  provider: SocialAuthProviders;
}) {
  try {
    const result = await signInWithSocialService({ provider });
    // const session = await getSessionAction();

    // console.log(session);

    // if (!session.data) {
    //   throw new UnauthorizedError();
    // }

    // await userHasCompanyAction({ userId: session.data.user.id });
    return { ok: true, data: result };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { ok: false, error: mapErrorToPayload(error) };
  }
}

export async function forgotPasswordEmailAction(data: unknown) {
  try {
    const result = await forgotPasswordEmailService(data);

    return { ok: true, data: result };
  } catch (error) {
    return { ok: false, error: mapErrorToPayload(error) };
  }
}

export async function resetPasswordAction(data: unknown) {
  try {
    const result = await resetPasswordService(data);

    return { ok: true, data: result };
  } catch (error) {
    return { ok: false, error: mapErrorToPayload(error) };
  }
}

// User
export async function userHasCompanyAction({ userId }: { userId: User["id"] }) {
  const userHasCompany = await userHasCompanyService({
    userId,
  });

  if (userHasCompany?.companyUsers.length === 0) {
    redirect("/onboarding");
  }
}

// Session
export async function getSessionAction() {
  try {
    const result = await getSessionService();
    return { ok: true, data: result };
  } catch (error) {
    return { ok: false, error: mapErrorToPayload(error) };
  }
}
