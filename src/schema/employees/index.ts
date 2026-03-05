import { z } from "zod";

export const createEmployeesFromSchema = z.object({
  name: z.string("El nombre es obligatorio").min(4, {
    error: "El nombre debe tener al menos 4 caracteres.",
  }),
  phone: z
    .string()
    .min(1, "El teléfono es requerido")
    .transform((val) => val.replace(/\D/g, "")) // Limpia al validar
    .pipe(z.string().length(10, "El teléfono debe tener 10 dígitos")),
  document: z.string().optional(),
  isActive: z.boolean(),
});

