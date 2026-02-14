import { ActionResult, mapErrorToPayload } from "@/src/lib/errors";
import { prisma } from "@/src/lib/prisma";
import { isRedirectError } from "next/dist/client/components/redirect-error";


// export async function createNewCarWashService(data: unknown):
//   Promise<ActionResult<SignInResponse>> {
//     try {
//       const result = await singInWithEmailService(data);
//       await userHasCompanyAction({ userId: result.user.id });
  
//       return { ok: true, data: result };
//     } catch (error) {
//       if (isRedirectError(error)) {
//         throw error;
//       }
//       return { ok: false, error: mapErrorToPayload(error) };
//     }
