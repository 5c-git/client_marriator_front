import { z } from "zod";

export const postPersonalCheckEmailCodeSuccessSchema = z.object({
  status: z.literal("success"),
});

export type PostPersonalCheckEmailCodeSuccess = z.infer<
  typeof postPersonalCheckEmailCodeSuccessSchema
>;
