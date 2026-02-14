import { ActionResult, mapErrorToPayload } from "@/src/lib/errors";
import { userHasCompanyAction } from "../auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { createNewCarWashService } from "@/src/services/onboarding";

export async function crearCarWashAction(
  data: unknown,
): Promise<ActionResult<unknown>> {
  try {
    const result = await createNewCarWashService(data);
    console.log("Car wash created successfully:", result);

    return { ok: true, data: result };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { ok: false, error: mapErrorToPayload(error) };
  }
}