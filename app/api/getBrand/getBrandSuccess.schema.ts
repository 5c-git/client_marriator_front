import { z } from "zod";

export const getBrandSuccessSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      logo: z.union([z.string(), z.null()]),
      description: z.string(),
    }),
  ),
});

export type GetBrandSuccess = z.infer<typeof getBrandSuccessSchema>;
