import { z } from "zod";

export const postCancelTaskSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostCancelTaskSuccess = z.infer<typeof postCancelTaskSuccessSchema>;
