import { z } from "zod";

const phoneRegex = /^(\+?1[-.\s]?)?\(?8[024]9\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

export const createCarWashFromSchema = z.object({
  name: z.string("El nombre es obligatorio").min(4, {
    error: "El nombre debe tener al menos 4 caracteres.",
  }),
  phone: z
    .string()
    .min(1, "El teléfono es requerido")
    .transform((val) => val.replace(/\D/g, "")) // Limpia al validar
    .pipe(z.string().length(10, "El teléfono debe tener 10 dígitos")),
  description: z.string().optional(),
});

export const nameCarWashFormSchema = createCarWashFromSchema.pick({
  name: true,
});

export const phoneCarWashFormSchema = createCarWashFromSchema.pick({
  phone: true,
});

export const descriptionCarWashFormSchema = createCarWashFromSchema.pick({
  description: true,
});
