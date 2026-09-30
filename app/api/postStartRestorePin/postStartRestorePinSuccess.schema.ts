import { z } from "zod";

export const postStartRestorePinSuccessSchema = z.object({
  status: z.literal("success"),
  result: z.object({
    code: z.union([
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
    token: z.object({
      token_type: z.literal("Bearer"),
      expires_in: z.number(),
      access_token: z.string(),
      refresh_token: z.string(),
    }),
  }),
});

export type PostStartRestorePinSuccess = z.infer<
  typeof postStartRestorePinSuccessSchema
>;
