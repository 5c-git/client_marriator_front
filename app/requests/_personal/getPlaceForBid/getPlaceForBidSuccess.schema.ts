import { z } from "zod";

export const getPlaceForBidSuccessSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      latitude: z.string(),
      longitude: z.string(),
      address_kladr: z.string(),
      logo: z.union([z.null(), z.string()]),
      region: z.object({ id: z.number(), name: z.string() }),
      brand: z.object({
        id: z.number(),
        name: z.string(),
        logo: z.union([z.null(), z.string()]),
        description: z.string(),
      }),
    }),
  ),
});

export type GetPlaceForBidSuccess = z.infer<typeof getPlaceForBidSuccessSchema>;
