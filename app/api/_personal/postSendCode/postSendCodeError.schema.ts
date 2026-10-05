import { z } from "zod";

export const postSendCodeErrorSchema = z.object({
  data: z.strictObject({ error: z.boolean() }),
});

export type PostSendCodeError = z.infer<typeof postSendCodeErrorSchema>;
