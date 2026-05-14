import { z } from "zod";

export const getUserByHashSuccessSchema = z.object({
  result: z.object({
    userId: z.number(),
    phone: z.number(),
    email: z.string(),
    role: z.enum(["admin", "manager", "client", "recruiter"]),
  }),
  status: z.string(),
});

export type GetUserByHashSuccess = z.infer<typeof getUserByHashSuccessSchema>;
