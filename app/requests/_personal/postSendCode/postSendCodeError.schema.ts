import { z } from "zod";

export const postSendCodeErrorSchema = z.object({
  data: z.object({ error: z.boolean() }),
});

export type PostSendCodeError = z.infer<typeof postSendCodeErrorSchema>;
