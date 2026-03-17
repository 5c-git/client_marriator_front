import { z } from "zod";

export const postSendPhoneSuccessSchema = z.object({
  result: z.object({
    type: z.enum(["register", "auth", "moderation"]),
    code: z.object({
      code: z.number(),
      status: z.literal("success"),
      ttl: z.number(),
    }),
  }),
  status: z.literal("success"),
});

export type postSendPhoneSuccess = z.infer<typeof postSendPhoneSuccessSchema>;
