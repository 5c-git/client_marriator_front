import { z } from "zod";

export const postDeleteRequisiteSuccessSchema = z.object({
  status: z.literal("success"),
});

export type PostDeleteRequisiteSuccess = z.infer<
  typeof postDeleteRequisiteSuccessSchema
>;
