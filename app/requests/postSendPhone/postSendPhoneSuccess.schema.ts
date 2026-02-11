import { z } from "zod";

export const postSendPhoneSuccessSchema = z.object({
  status: z.literal("success"),
  result: z.object({
    type: z.enum(["auth", "register", "moderation"]),
    code: z.union([
      z.object({
        status: z.literal("errorSend"),
      }),
      z.object({
        status: z.literal("exists"),
        ttl: z.number(),
      }),
      z.object({
        status: z.literal("success"),
        code: z.number(),
        ttl: z.number(),
      }),
    ]),
  }),
});

export type PostSendPhoneSuccess = z.infer<typeof postSendPhoneSuccessSchema>;
