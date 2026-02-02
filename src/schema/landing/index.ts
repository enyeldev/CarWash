import { z } from "zod";

export const signupSchema = z.object({
  plan: z.enum(["FREE", "PRO"]).catch("FREE"),
  modalPrice: z.preprocess((val) => val === "true", z.boolean()).optional(),
});
