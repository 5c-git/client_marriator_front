import { z } from "zod";

export const getOrdersSuccessSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      createdAt: z.string(),
      place: z.object({
        id: z.number(),
        name: z.string(),
        latitude: z.string(),
        longitude: z.string(),
        address_kladr: z.string(),
        logo: z.union([z.null(), z.string()]),
        region: z.object({ id: z.number(), name: z.string() }),
        brand: z.union([
          z.null(),
          z.object({
            id: z.number(),
            name: z.string(),
            logo: z.string(),
            description: z.string(),
          }),
        ]),
      }),
      status: z.union([
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5),
      ]),
      user: z.object({
        id: z.number(),
      }),
      orderActivities: z.array(
        z.object({
          viewActivity: z.object({
            id: z.number(),
            name: z.string(),
            detailName: z.string(),
            previewText: z.string(),
            logo: z.string(),
            traveling: z.boolean(),
            standard: z.object({
              id: z.number(),
              name: z.string(),
              coefficient: z.number(),
            }),
          }),
          id: z.number(),
          count: z.number(),
          dateStart: z.string(),
          dateEnd: z.string(),
          needFoto: z.boolean(),
          dateActivity: z.array(
            z.object({
              timeStart: z.string(),
              timeEnd: z.string(),
              places: z.array(
                z.object({
                  id: z.number(),
                  name: z.string(),
                  latitude: z.string(),
                  longitude: z.string(),
                  address_kladr: z.string(),
                  logo: z.union([z.null(), z.string()]).optional(),
                  region: z.object({ id: z.number(), name: z.string() }),
                  brand: z.object({
                    id: z.number(),
                    name: z.string(),
                    logo: z.union([z.null(), z.string()]).optional(),
                    description: z.string(),
                  }),
                }),
              ),
            }),
          ),
        }),
      ),
    }),
  ),
});

export type GetOrdersSuccess = z.infer<typeof getOrdersSuccessSchema>;
