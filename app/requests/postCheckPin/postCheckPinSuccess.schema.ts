import { z } from "zod";

export const postCheckPinSuccessSchema = z.object({
  status: z.literal("success"),
  result: z.object({
    token: z.object({
      token_type: z.literal("Bearer"),
      expires_in: z.number(),
      access_token: z.string(),
      refresh_token: z.string(),
    }),
  }),
});

export type PostCheckPinSuccess = z.infer<typeof postCheckPinSuccessSchema>;
