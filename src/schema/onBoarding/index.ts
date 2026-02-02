import { z } from "zod";

const phoneRegex = /^(\+?1[-.\s]?)?\(?8[024]9\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

export const createCarWashFromSchema = z.object({
  companyName: z.string("El nombre es obligatorio"),
  phone: z
    .string()
    .min(10, {
      error: "La contraseña debe tener un minino de 8 caracteres.",
    })
    .regex(phoneRegex, {
      error: "Numero de telefono no valido.",
    }),
  description: z.string().optional(),
});
