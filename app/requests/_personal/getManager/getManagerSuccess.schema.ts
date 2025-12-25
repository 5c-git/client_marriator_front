import { z } from "zod";

export const getManagerSuccessSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      phone: z.number(),
      email: z.string(),
      logo: z.union([z.null(), z.string()]).optional(),
      roles: z.array(
        z.object({
          id: z.number().gte(1).lte(6),
          name: z.enum([
            "admin",
            "client",
            "manager",
            "recruiter",
            "specialist",
            "supervisor",
          ]),
        }),
      ),
    }),
  ),
});

export type GetManagerSuccess = z.infer<typeof getManagerSuccessSchema>;
