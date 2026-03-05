"use server";
import { ActionResult, mapErrorToPayload, UnauthorizedError } from "@/src/lib/errors";
import { getSessionService } from "@/src/services/auth";
import { userHasCompanyAction } from "../auth";
import { createEmployeesWashService, deleteEmployeesServices, getEmployeesService, patchEmployeesServices } from "@/src/services/employees";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { employeesWash } from "@/src/types/employees";

export async function crearEmployeesAction(
  data: unknown,
): Promise<ActionResult<employeesWash>> {
  try {
    const session = await getSessionService();

    if (!session?.user) {
      throw new UnauthorizedError();
    }

    const companies = await userHasCompanyAction({userId :session.user.id})

    const companyId = companies?.memberships[0].company.id;

    if (!companyId) {
        throw new UnauthorizedError();
    }

    const result = await createEmployeesWashService(data, companyId);

    return {
      ok: true,
      data: {
        name: result.name,
        phone: result.phone || "",
        document: result.document || "",
        isActive: result.isActive
      },
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { ok: false, error: mapErrorToPayload(error) };
  }
}

export async function getEmployeesAction(companyId: string){
  try {
    const result = await getEmployeesService(companyId);
    return { ok: true, data: result };
  } catch (error) {
    return { ok: false, error: mapErrorToPayload(error) };
  }
}

export async function deleteEmployeesAction(id:string) {
  try {
    const result = await deleteEmployeesServices(id);
    return { ok: true, data: result };
  } catch (error) {
    return { ok: false, error: mapErrorToPayload(error) };
  }
}

export type EmployeeData = {
  name: string;
  phone: string | null;
  document: string | null;
  isActive: boolean;
  id: string;
  companyId: string;
};

export async function patchEmployeesAction(data: EmployeeData) {
  try {
    const result = await patchEmployeesServices(data);
    return { ok: true, data: result };
  } catch (error) {
    return { ok: false, error: mapErrorToPayload(error) };
  }
}