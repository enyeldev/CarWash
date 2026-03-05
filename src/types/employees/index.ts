import { createEmployeesFromSchema } from "@/src/schema/employees";
import { z } from "zod";

export type createEmployeesFromType = z.infer<typeof createEmployeesFromSchema>;

export type employeesWash = Pick<
  createEmployeesFromType,
  "name" | "phone" | "isActive" | "document"
>;