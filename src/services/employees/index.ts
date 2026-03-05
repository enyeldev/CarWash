import { Company, Prisma } from "@/src/generated/prisma/client";
import { ValidationAppError } from "@/src/lib/errors";
import { prisma } from "@/src/lib/prisma";
import { createEmployeesFromSchema } from "@/src/schema/employees";

export async function createEmployeesWashService(
  data: unknown,
  companyId: Company["id"]
) {
  const result = createEmployeesFromSchema.safeParse(data);
  if (!result.success) {
    throw new ValidationAppError(result.error.issues, "Error de schema");
  }

  const { data: employees } = result;
  const response = await prisma.washMan.create({
    data: {
        ...employees,
        companyId
    }
  })
  
  return response

}

export async function getEmployeesService(companyId: string) {
  return await prisma.washMan.findMany({
    where: {
      companyId,
    },
  })
}

export async function deleteEmployeesServices(id:string) {
  return await prisma.washMan.delete({
      where: { id: id },
  })
}

export type EmployeeData = {
  name: string;
  phone: string | null;
  document: string | null;
  isActive: boolean;
  id: string;
  companyId: string;
};

export async function patchEmployeesServices(data: EmployeeData) {
  console.log(data)
  const id = data.id
  return await prisma.washMan.update({
    where: { id },
    data
  });
}