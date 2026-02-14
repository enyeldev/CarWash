import { z } from "zod";

const phoneRegex = /^(\+?1[-.\s]?)?\(?8[024]9\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

export const createCarWashFromSchema = z.object({
  companyName: z.string("El nombre es obligatorio").min(4, {
      error: "El nombre debe tener al menos 4 caracteres.",
    }),
  phone: z
    .string("El telefono es obligatorio")
    .min(10, {
      error: "El numero de telefono debe tener al menos 10 digitos.",
    })
    .regex(phoneRegex, {
      error: "Numero de telefono no valido.",
    }),
  description: z.string().optional(),
});
