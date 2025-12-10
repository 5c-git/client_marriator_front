import { z } from "zod";

export const postAcceptTaskSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostAcceptTaskSuccess = z.infer<typeof postAcceptTaskSuccessSchema>;
