import { z } from "zod";

export const getTaskSuccessSchema = z.object({
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
    project: z.object({
      id: z.number(),
      name: z.string(),
      dateStart: z.string(),
      dateEnd: z.string(),
      timeStart: z.union([z.null(), z.string()]),
      timeEnd: z.union([z.null(), z.string()]),
      brand: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          logo: z.string(),
          description: z.string(),
        }),
      ),
    }),
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
    acceptUser: z.union([
      z.null(),
      z.object({
        id: z.number(),
        phone: z.number(),
        email: z.string(),
        name: z.string(),
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
    ]),
    orderActivities: z.array(
      z.object({
        id: z.number(),
        buttonBidNeed: z.boolean(),
        buttonSearchNeed: z.boolean(),
        count: z.number(),
        countSearch: z.number(),
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
                logo: z.union([z.null(), z.string()]).optional(),
                region: z.object({ id: z.number(), name: z.string() }),
                brand: z.object({
                  id: z.number(),
                  name: z.string(),
                  logo: z.union([z.null(), z.string()]),
                  description: z.string(),
                }),
              }),
            ),
          }),
        ),
      }),
    ),
    acceptedUser: z.array(
      z.object({
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
    ),
    statistic: z.array(z.object({ accepted: z.number(), count: z.number() })),
  }),
});

export type GetTaskSuccess = z.infer<typeof getTaskSuccessSchema>;
