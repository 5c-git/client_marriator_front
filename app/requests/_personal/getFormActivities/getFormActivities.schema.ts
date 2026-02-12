import { inputs } from "~/shared/constructor/inputs.schema";

import { z } from "zod";

export const getFormActivitiesSuccessSchema = z.object({
  status: z.literal("success"),
  result: z.object({
    formData: inputs,
    step: z.number(),
    type: z.enum(["needRequired", "allowedNewStep"]),
  }),
});

export type GetFormActivitiesSuccess = z.infer<
  typeof getFormActivitiesSuccessSchema
>;
