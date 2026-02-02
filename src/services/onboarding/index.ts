import { prisma } from "@/src/lib/prisma";


export async function createNewCarWashService(data: unknown) {
  await prisma.company.create({
    data: {
      name: "",
      phone: "",
      users: {
        create: {
          userId: "",
          roleId: "",
        },
      },
    },
  });

  await prisma.role.create({
    data: {
        name: '',
    }
  })
}
