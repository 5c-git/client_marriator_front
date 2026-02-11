import { z } from "zod";

export const postRefreshTokenErrorSchema = z.object({
  status: z.literal("success"),
  result: z.object({
    token: z.object({
      error: z.literal("invalid_request"),
      error_description: z.string(),
      hint: z.string(),
      message: z.string(),
    }),
  }),
});

export type PostRefreshTokenError = z.infer<typeof postRefreshTokenErrorSchema>;
