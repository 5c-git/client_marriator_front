import { z } from "zod";

export const postCheckCodeSuccessSchema = z.object({
  result: z.object({
    token: z.object({
      token_type: z.literal("Bearer"),
      expires_in: z.number().int(),
      access_token: z.string(),
      refresh_token: z.string(),
    }),
  }),
  status: z.literal("success"),
});

export type PostCheckCodeSuccess = z.infer<typeof postCheckCodeSuccessSchema>;
