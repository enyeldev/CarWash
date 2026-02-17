import { Company } from "@/src/generated/prisma/client";
import {
  createCarWashFromSchema,
  descriptionCarWashFormSchema,
  nameCarWashFormSchema,
  phoneCarWashFormSchema,
} from "@/src/schema/onBoarding";
import { z } from "zod";

export type CreateCarWashFromType = z.infer<typeof createCarWashFromSchema>;

export type NameCarWashFormType = z.infer<typeof nameCarWashFormSchema>;
export type PhoneCarWashFormType = z.infer<typeof phoneCarWashFormSchema>;
export type DescriptionCarWashFormType = z.infer<
  typeof descriptionCarWashFormSchema
>;

export type CompanyBasic = Pick<
  CreateCarWashFromType,
  "name" | "description" | "phone"
>;
