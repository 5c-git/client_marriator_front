import { z } from "zod";

export const postStartRestorePinErrorSchema = z.object({
  result: z.object({
    code: z.object({ status: z.literal("exists"), ttl: z.number() }),
    token: z.object({
      token_type: z.literal("Bearer"),
      expires_in: z.number(),
      access_token: z.string(),
      refresh_token: z.string(),
    }),
  }),
  status: z.string(),
});

export type PostStartRestorePinError = z.infer<
  typeof postStartRestorePinErrorSchema
>;
