import { z } from "zod";

export const postUpdateBidSuccessSchema = z.object({
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
      brand: z.object({
        id: z.number(),
        name: z.string(),
        logo: z.string(),
        description: z.string(),
      }),
    }),
    user: z.object({
      id: z.number(),
      phone: z.number(),
      email: z.string(),
      logo: z.string(),
    }),
    radius: z.number(),
    price: z.number(),
    priceResult: z.number(),
    viewActivity: z.object({
      name: z.string(),
      detailName: z.string(),
      previewText: z.string(),
      logo: z.string(),
    }),
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
    order: z.union([
      z.null(),
      z.object({
        id: z.number(),
        selfEmployed: z.boolean(),
        status: z.number(),
        user: z.object({
          id: z.number(),
          phone: z.number(),
          email: z.string(),
          logo: z.string(),
        }),
      }),
    ]),
    task: z.union([
      z.null(),
      z.object({
        id: z.number(),
        selfEmployed: z.boolean(),
        status: z.number(),
        user: z.object({
          id: z.number(),
          phone: z.number(),
          email: z.string(),
          logo: z.string(),
        }),
      }),
    ]),
    acceptingUsers: z.array(
      z.object({
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
    ),
  }),
});

export type PostUpdateBidSuccess = z.infer<typeof postUpdateBidSuccessSchema>;
