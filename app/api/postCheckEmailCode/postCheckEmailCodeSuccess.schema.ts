import { z } from "zod";

export const postCheckEmailCodeSuccessSchema = z.object({
  status: z.literal("success"),
});

export type PostCheckEmailCodeSuccess = z.infer<
  typeof postCheckEmailCodeSuccessSchema
>;
