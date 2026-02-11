import { z } from "zod";

export const getUserByHashErrorSchema = z.object({
  error: z.string(),
  status: z.string(),
});

export type GetUserByHashError = z.infer<typeof getUserByHashErrorSchema>;
