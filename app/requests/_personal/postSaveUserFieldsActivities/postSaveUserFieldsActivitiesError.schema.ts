import { z } from "zod";

export const postSaveUserFieldsActivitiesErrorSchema = z.object({
  status: z.string(),
  error: z.literal("error"),
});

export type PostSaveUserFieldsActivitiesError = z.infer<
  typeof postSaveUserFieldsActivitiesErrorSchema
>;
