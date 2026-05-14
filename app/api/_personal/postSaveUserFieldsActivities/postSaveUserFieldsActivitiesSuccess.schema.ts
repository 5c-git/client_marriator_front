import { z } from "zod";

export const postSaveUserFieldsActivitiesSuccessSchema = z.object({
  result: z.object({
    step: z.number(),
    type: z.enum(["needRequired", "allowedNewStep", "addedNewFields"]),
  }),
  status: z.literal("success"),
});

export type PostSaveUserFieldsActivitiesSuccess = z.infer<
  typeof postSaveUserFieldsActivitiesSuccessSchema
>;
