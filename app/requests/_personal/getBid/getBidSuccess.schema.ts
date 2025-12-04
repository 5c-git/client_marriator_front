import { z } from "zod";

export const getBidSuccessSchema = z.object({
  data: z.object({
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
            logo: z.string(),
            region: z.object({ id: z.number(), name: z.string() }),
            brand: z.object({
              id: z.number(),
              name: z.string(),
              logo: z.string(),
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
        radius: z.string(),
        name: z.string(),
        age: z.string(),
        country: z.string(),
        viewActivities: z.array(z.string()),
        status: z.union([
          z.literal(1),
          z.literal(2),
          z.literal(3),
          z.literal(4),
          z.literal(5),
        ]),
      }),
    ),
    count: z.number(),
    statistic: z.array(z.object({ accepted: z.number(), count: z.number() })),
  }),
});

export type GetBidSuccess = z.infer<typeof getBidSuccessSchema>;
