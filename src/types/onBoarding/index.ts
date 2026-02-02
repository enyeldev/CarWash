import { createCarWashFromSchema } from "@/src/schema/onBoarding";
import { z } from "zod";

export type CreateCarWashFromType = z.infer<typeof createCarWashFromSchema>;
