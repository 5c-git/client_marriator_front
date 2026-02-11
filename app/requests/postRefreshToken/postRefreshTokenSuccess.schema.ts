import { z } from "zod";

export const postRefreshTokenSuccessSchema = z.object({
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

export type PostRefreshTokenSuccess = z.infer<
  typeof postRefreshTokenSuccessSchema
>;
