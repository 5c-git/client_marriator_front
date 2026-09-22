import { z } from "zod";

export const getBidsSuccessSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      createdAt: z.string(),
      user: z.object({
        id: z.number(),
      }),
      status: z.union([
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5),
        z.literal(6),
        z.literal(7),
        z.literal(8),
      ]),
      place: z.object({
        id: z.number(),
        name: z.string(),
        latitude: z.string(),
        longitude: z.string(),
        address_kladr: z.string(),
        logo: z.string(),
        region: z.object({ id: z.number(), name: z.string() }),
        brand: z.object({
          id: z.number(),
          name: z.string(),
          logo: z.string(),
          description: z.string(),
        }),
      }),
      viewActivity: z.object({
        id: z.number(),
        name: z.string(),
        detailName: z.string(),
        previewText: z.string(),
        logo: z.string(),
        traveling: z.boolean(),
        standard: z.object({
          id: z.number(),
          coefficient: z.number(),
          name: z.string(),
        }),
      }),
      dateStart: z.string(),
      dateEnd: z.string(),
    }),
  ),
});

export type GetBidsSuccess = z.infer<typeof getBidsSuccessSchema>;
