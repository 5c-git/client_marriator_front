import { z } from "zod";

export const getUserByHashSuccessSchema = z.object({
  result: z.object({
    userId: z.number(),
    phone: z.number(),
    email: z.string(),
    role: z.enum(["admin" , "supervisor" , "manager" , "client" , "specialist"]),
  }),
  status: z.string(),
});

export type GetUserByHashSuccess = z.infer<typeof getUserByHashSuccessSchema>;
