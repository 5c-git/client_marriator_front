import { z } from "zod";

export const postSendOrderSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostSendOrderSuccess = z.infer<typeof postSendOrderSuccessSchema>;
