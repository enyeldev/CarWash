"use server";

import {
  ActionResult,
  mapErrorToPayload,
  UnauthorizedError,
} from "@/src/lib/errors";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { createNewCarWashService } from "@/src/services/onboarding";
import { getSessionService } from "@/src/services/auth";
import { CompanyBasic } from "@/src/types/onBoarding";

export async function crearCarWashAction(
  data: unknown,
): Promise<ActionResult<CompanyBasic>> {
  try {
    const session = await getSessionService();

    if (!session?.user) {
      throw new UnauthorizedError();
    }

    const result = await createNewCarWashService(data, session.user.id);

    console.log("Car wash created successfully:", result);

    return {
      ok: true,
      data: {
        name: result.name,
        phone: result.phone,
        description: result.description || "",
      },
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { ok: false, error: mapErrorToPayload(error) };
  }
}
