import { z } from "zod";

export const getBidSuccessSchema = z.strictObject({
  data: z.strictObject({
    id: z.number(),
    user: z.strictObject({
      id: z.number(),
      phone: z.number(),
      name: z.string(),
      email: z.string(),
      logo: z.string(),
      roles: z.array(
        z.strictObject({
          id: z.number().gte(1).lte(6),
          name: z.enum(["manager", "supervisor", "client", "specialist"]),
        })
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
    place: z.strictObject({
      id: z.number(),
      name: z.string(),
      latitude: z.string(),
      longitude: z.string(),
      address_kladr: z.string(),
      logo: z.string(),
      region: z.strictObject({ id: z.number(), name: z.string() }),
      brand: z.strictObject({
        id: z.number(),
        name: z.string(),
        logo: z.string(),
        description: z.string(),
      }),
    }),
    radius: z.union([z.null(), z.number()]),
    price: z.union([z.null(), z.number()]),
    priceResult: z.number(),
    viewActivity: z.strictObject({
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
      z.strictObject({
        id: z.number(),
        timeStart: z.string(),
        timeEnd: z.string(),
        places: z.array(
          z.strictObject({
            id: z.number(),
            name: z.string(),
            latitude: z.string(),
            longitude: z.string(),
            address_kladr: z.string(),
            logo: z.string(),
            region: z.strictObject({ id: z.number(), name: z.string() }),
            brand: z.strictObject({
              id: z.number(),
              name: z.string(),
              logo: z.string(),
              description: z.string(),
            }),
          })
        ),
      })
    ),
    order: z.union([
      z.null(),
      z.strictObject({
        id: z.number(),
        selfEmployed: z.boolean(),
        status: z.number(),
        user: z.strictObject({
          id: z.number(),
          phone: z.number(),
          email: z.string(),
          logo: z.string(),
          name: z.string(),
          roles: z.array(
            z.strictObject({
              id: z.number().gte(1).lte(6),
              name: z.enum([
                "admin",
                "client",
                "manager",
                "recruiter",
                "specialist",
                "supervisor",
              ]),
            })
          ),
        }),
        statistic: z.array(
          z.strictObject({ accepted: z.number(), count: z.number() })
        ),
      }),
    ]),
    task: z.union([
      z.null(),
      z.strictObject({
        id: z.number(),
        selfEmployed: z.boolean(),
        status: z.number(),
        user: z.strictObject({
          id: z.number(),
          phone: z.number(),
          email: z.string(),
          logo: z.string(),
          name: z.string(),
          roles: z.array(
            z.strictObject({
              id: z.number().gte(1).lte(6),
              name: z.enum([
                "admin",
                "client",
                "manager",
                "recruiter",
                "specialist",
                "supervisor",
              ]),
            })
          ),
        }),
        statistic: z.array(
          z.strictObject({ accepted: z.number(), count: z.number() })
        ),
      }),
    ]),
    acceptingUsers: z.array(
      z.strictObject({
        id: z.number(),
        phone: z.number(),
        email: z.string(),
        logo: z.string(),
        roles: z.array(
          z.strictObject({
            id: z.number().gte(1).lte(6),
            name: z.enum(["manager", "supervisor", "client", "specialist"]),
          })
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
          z.literal(6),
          z.literal(7),
          z.literal(8),
        ]),
      })
    ),
    count: z.number(),
    statistic: z.array(
      z.strictObject({ accepted: z.number(), count: z.number() })
    ),
    project: z.strictObject({
      id: z.number(),
      name: z.string(),
      dateStart: z.string(),
      dateEnd: z.string(),
      brand: z.array(
        z.strictObject({
          id: z.number(),
          name: z.string(),
          logo: z.string(),
          description: z.string(),
        })
      ),
    }),
  }),
});

export type GetBidSuccess = z.infer<typeof getBidSuccessSchema>;
