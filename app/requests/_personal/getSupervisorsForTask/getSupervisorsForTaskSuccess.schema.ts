import { z } from "zod";

export const getSupervisorsForTaskSuccessSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      phone: z.number(),
      email: z.string(),
      logo: z.union([z.null(), z.string()]),
      roles: z.array(
        z.object({
          id: z.number().gte(1).lte(6),
          name: z.enum([
            "admin",
            "manager",
            "supervisor",
            "client",
            "specialist",
          ]),
        }),
      ),
    }),
  ),
});

export type GetSupervisorsForTaskSuccess = z.infer<
  typeof getSupervisorsForTaskSuccessSchema
>;
