import { inputs } from "~/shared/constructor/inputs.schema";

import { z } from "zod";

export const getUserFieldsSuccessSchema = z.object({
  status: z.literal("success"),
  result: z.object({
    formData: inputs,
    section: z.array(
      z.object({
        name: z.string(),
        value: z.number(),
        notification: z.boolean(),
      }),
    ),
    type: z.enum(["needRequired", "allowedNewStep"]),
  }),
});

export type GetUserFieldsSuccess = z.infer<typeof getUserFieldsSuccessSchema>;
