import { z } from "zod";

export const getPlaceModerationSuccessSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      latitude: z.string(),
      longitude: z.string(),
      address_kladr: z.string(),
      logo: z.union([z.string(), z.null()]),
      region: z.object({ id: z.number(), name: z.string() }),
      brand: z.object({
        id: z.number(),
        name: z.string(),
        logo: z.union([z.string(), z.null()]),
        description: z.string(),
      }),
    })
  ),
});

export type GetPlaceModerationSuccess = z.infer<
  typeof getPlaceModerationSuccessSchema
>;
