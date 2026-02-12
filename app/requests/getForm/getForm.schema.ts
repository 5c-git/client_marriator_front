import { inputs } from "~/shared/constructor/inputs.schema";
import { z } from "zod";

export const getFormInputsSuccessSchema = z.object({
  result: z.object({
    formData: inputs,
    step: z.number(),
    type: z.enum(["needRequired", "allowedNewStep", "addedNewFields"]),
  }),
  status: z.literal("success"),
});

export type GetFormInputsSuccess = z.infer<typeof getFormInputsSuccessSchema>;
