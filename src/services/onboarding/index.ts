import { User } from "@/src/generated/prisma/client";
import { ValidationAppError } from "@/src/lib/errors";
import { prisma } from "@/src/lib/prisma";
import { createCarWashFromSchema } from "@/src/schema/onBoarding";

export async function createNewCarWashService(
  data: unknown,
  userId: User["id"],
) {
  const result = createCarWashFromSchema.safeParse(data);
  if (!result.success) {
    throw new ValidationAppError(result.error.issues, "Error de schema");
  }

  const { data: dataCarWash } = result;

  const response = await prisma.company.create({
    data: {
      ...dataCarWash,
      members: {
        create: {
          userId,
          role: "OWNER",
        },
      },
    },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  return response;
}
