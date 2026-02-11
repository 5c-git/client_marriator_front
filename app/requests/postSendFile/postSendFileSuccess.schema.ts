import { z } from "zod";

export const postSendFileSuccessSchema = z.object({
  resFile: z.string(),
  status: z.literal("success"),
});

export type PostSendFileSuccess = z.infer<typeof postSendFileSuccessSchema>;
