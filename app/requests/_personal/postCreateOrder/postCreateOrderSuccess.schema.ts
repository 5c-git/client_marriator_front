import { z } from "zod";

export const postCreateOrderSuccessSchema = z.object({
  data: z.object({
    id: z.number(),
    selfEmployed: z.boolean(),
    status: z.union([
      z.literal(1),
      z.literal(2),
      z.literal(3),
      z.literal(4),
      z.literal(5),
    ]),
    place: z.object({
      id: z.number(),
      name: z.string(),
      latitude: z.string(),
      longitude: z.string(),
      address_kladr: z.string(),
      logo: z.string(),
      region: z.object({ id: z.number(), name: z.string() }),
      brand: z.union([
        z.object({
          id: z.number(),
          name: z.string(),
          logo: z.union([z.null(), z.string()]),
          description: z.string(),
        }),
      ]),
    }),
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
    orderActivities: z.array(
      z.object({
        viewActivity: z.object({
          name: z.string(),
          detailName: z.string(),
          previewText: z.string(),
          logo: z.string(),
        }),
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
                logo: z.union([z.null(), z.string()]),
                region: z.object({ id: z.number(), name: z.string() }),
                brand: z.union([
                  z.null(),
                  z.object({
                    id: z.number(),
                    name: z.string(),
                    logo: z.union([z.null(), z.string()]),
                    description: z.string(),
                  }),
                ]),
              }),
            ),
          }),
        ),
      }),
    ),
  }),
});

export type PostCreateOrderSuccess = z.infer<
  typeof postCreateOrderSuccessSchema
>;
