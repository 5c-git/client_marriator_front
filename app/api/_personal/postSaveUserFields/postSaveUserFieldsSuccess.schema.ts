import { z } from "zod";

export const postSaveUserFieldsSuccessSchema = z.object({
  status: z.literal("success"),
});

export type PostSaveUserFieldsSuccess = z.infer<
  typeof postSaveUserFieldsSuccessSchema
>;
