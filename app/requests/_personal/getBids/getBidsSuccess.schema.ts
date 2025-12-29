import { z } from "zod";

export const getBidsSuccessSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      user: z.object({
        id: z.number(),
        phone: z.number(),
        email: z.string(),
        logo: z.string(),
        roles: z.array(
          z.object({
            id: z.number().gte(1).lte(6),
            name: z.enum([
              "admin",
              "client",
              "manager",
              "recruiter",
              "specialist",
              "supervisor",
            ]),
          }),
        ),
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
      selfEmployed: z.boolean(),
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
      radius: z.union([z.null(), z.number()]),
      price: z.union([z.null(), z.number()]),
      priceResult: z.number(),
      viewActivity: z.object({
        id: z.number(),
        name: z.string(),
        detailName: z.string(),
        previewText: z.string(),
        logo: z.string(),
        traveling: z.boolean(),
      }),
      dateStart: z.string(),
      dateEnd: z.string(),
      needFoto: z.boolean(),
      dateActivity: z.array(z.any()),
    }),
  ),
});

export type GetBidsSuccess = z.infer<typeof getBidsSuccessSchema>;
