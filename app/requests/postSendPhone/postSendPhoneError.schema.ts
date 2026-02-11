import { z } from "zod";

export const postSendPhoneErrorSchema = z.object({
  status: z.literal("error"),
  error: z.string(),
});

export type PostSendPhoneError = z.infer<typeof postSendPhoneErrorSchema>;
