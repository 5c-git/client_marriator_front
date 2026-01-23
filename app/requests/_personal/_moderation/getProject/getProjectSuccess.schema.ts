import { z } from "zod";

export const getProjectSuccessSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      brand: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          logo: z.union([z.string(), z.null()]),
          description: z.string(),
        })
      ),
    })
  ),
});

export type GetProjectSuccess = z.infer<typeof getProjectSuccessSchema>;
