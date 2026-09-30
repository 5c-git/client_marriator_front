import { z } from "zod";

export const postSendCodeSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostSendCodeSuccess = z.infer<typeof postSendCodeSuccessSchema>;
