import { z } from "zod";

export const postCreateSearchFromOrderSuccessSchema = z.object({
  data: z.object({
    id: z.number(),
    user: z.object({
      id: z.number(),
      phone: z.number(),
      name: z.string(),
      email: z.string(),
      logo: z.string(),
      roles: z.array(
        z.object({
          id: z.number().gte(1).lte(6),
          name: z.enum([
            "admin",
            "manager",
            "supervisor",
            "client",
            "specialist",
          ]),
        }),
      ),
    }),
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
        id: z.number(),
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
          name: z.string(),
          roles: z.array(
            z.object({
              id: z.number().gte(1).lte(6),
              name: z.enum([
                "admin",
                "manager",
                "supervisor",
                "client",
                "specialist",
              ]),
            }),
          ),
        }),
        statistic: z.array(
          z.object({ accepted: z.number(), count: z.number() }),
        ),
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
          name: z.string(),
          roles: z.array(
            z.object({
              id: z.number().gte(1).lte(6),
              name: z.enum([
                "admin",
                "manager",
                "supervisor",
                "client",
                "specialist",
              ]),
            }),
          ),
        }),
        statistic: z.array(
          z.object({ accepted: z.number(), count: z.number() }),
        ),
      }),
    ]),
    count: z.number(),
    project: z.object({
      id: z.number(),
      name: z.string(),
      dateStart: z.string(),
      dateEnd: z.string(),
      brand: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          logo: z.string(),
          description: z.string(),
        }),
      ),
    }),
  }),
});

export type PostCreateSearchFromOrderSuccess = z.infer<
  typeof postCreateSearchFromOrderSuccessSchema
>;
