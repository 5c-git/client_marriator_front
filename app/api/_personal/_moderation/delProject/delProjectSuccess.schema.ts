import { z } from "zod";

export const delProjectSuccessSchema = z.object({
  data: z.object({
    id: z.number(),
    name: z.union([z.string(), z.null()]),
    phone: z.number(),
    email: z.string(),
    logo: z.union([z.string(), z.null()]),
    project: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        brand: z.array(
          z.object({
            id: z.number(),
            name: z.string(),
            logo: z.string().optional(),
            description: z.string(),
          }),
        ),
      }),
    ),
    place: z.array(z.any()),
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
});

export type DelProjectSuccessSchema = z.infer<typeof delProjectSuccessSchema>;
