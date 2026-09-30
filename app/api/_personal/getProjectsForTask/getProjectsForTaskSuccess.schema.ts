import { z } from "zod";

export const getProjectsForTaskSuccessSchema = z.object({
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

export type GetProjectsForTaskSuccess = z.infer<
  typeof getProjectsForTaskSuccessSchema
>;
