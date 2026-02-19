import { z } from "zod";

export const postSendPhoneLoginSchema = z.object({
  result: z.object({
    type: z.enum(["auth", "moderation"]),
    token: z.object({
      access_token: z.string(),
      expires_in: z.number(),
      refresh_token: z.string(),
      token_type: z.literal("Bearer"),
    }),
  }),
});

export type PostSendPhoneLogin = z.infer<typeof postSendPhoneLoginSchema>;
