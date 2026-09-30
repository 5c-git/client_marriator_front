import { z } from "zod";

export const postSaveRequisitesDataSuccessSchema = z.object({
  status: z.literal("success"),
});

export type PostSaveRequisitesDataSuccess = z.infer<
  typeof postSaveRequisitesDataSuccessSchema
>;
