import { z } from "zod";

export const getProjectsForOrderSuccessSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      brand: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          logo: z.string(),
          description: z.string(),
        }),
      ),
    }),
  ),
});

export type GetProjectsForOrderSuccess = z.infer<
  typeof getProjectsForOrderSuccessSchema
>;
