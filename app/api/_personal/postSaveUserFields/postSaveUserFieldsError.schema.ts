import { z } from "zod";

export const postSaveUserFieldsErrorSchema = z.object({
  status: z.literal("error"),
  error: z.string(),
});

export type PostSaveUserFieldsError = z.infer<
  typeof postSaveUserFieldsErrorSchema
>;
