import { z } from "zod";

export const postSendPhoneErrorTimerSchema = z.object({
  result: z.object({
    type: z.string(),
    code: z.object({ status: z.literal("exists"), ttl: z.number() }),
  }),
  status: z.literal("error"),
});

export type PostSendPhoneErrorTimer = z.infer<
  typeof postSendPhoneErrorTimerSchema
>;
