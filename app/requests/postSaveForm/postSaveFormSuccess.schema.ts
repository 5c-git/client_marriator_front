import { z } from "zod";

export const postSaveFormSuccessSchema = z.object({
  result: z.object({
    step: z.number(),
    type: z.enum(["needRequired", "allowedNewStep", "addedNewFields"]),
  }),
  status: z.literal("success"),
});

export type PostSaveFormSuccess = z.infer<typeof postSaveFormSuccessSchema>;
