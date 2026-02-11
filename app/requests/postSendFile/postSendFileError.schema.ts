import { z } from "zod";

export const postSendFileErrorSchema = z.object({
  status: z.literal("error"),
  error: z.string(),
});

export type PostSendFileError = z.infer<typeof postSendFileErrorSchema>;
