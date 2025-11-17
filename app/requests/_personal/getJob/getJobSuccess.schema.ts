import { z } from "zod";

export const getJobSuccessSchema = z.object({
  data: z.object({
    id: z.number(),
    selfEmployed: z.boolean(),
    status: z.union([
      z.literal(1),
      z.literal(2),
      z.literal(3),
      z.literal(4),
      z.literal(5),
      z.literal(6),
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
      name: z.string(),
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
        })
      ),
    }),
    radius: z.number(),
    price: z.number(),
    priceResult: z.number(),
    income: z.number(),
    forPay: z.number(),
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
            logo: z.string().optional(),
            region: z.object({ id: z.number(), name: z.string() }),
            brand: z.object({
              id: z.number(),
              name: z.string(),
              logo: z.string().optional(),
              description: z.string(),
            }),
          })
        ),
      })
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
          email: z.email(),
          logo: z.string(),
          name: z.string(),
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
            })
          ),
        }),
        statistic: z.array(
          z.object({
            accepted: z.number(),
            count: z.number(),
          })
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
          name: z.string(),
          phone: z.number(),
          email: z.email(),
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
            })
          ),
        }),
        statistic: z.array(
          z.object({
            accepted: z.number(),
            count: z.number(),
          })
        ),
      }),
    ]),
    acceptingUser: z.object({
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
      ]),
    }),
    reports: z.array(
      z.object({
        dateStart: z.union([z.null(), z.string()]),
        dateEnd: z.union([z.null(), z.string()]),
        report: z.union([z.null(), z.array(z.string())]),
        dayActivityId: z.union([z.null(), z.number()]),
        id: z.number(),
        hours: z.union([z.null(), z.string()]),
        status: z.number(),
        reasons: z.array(
          z.object({
            id: z.number(),
            value: z.string(),
            amount: z.number(),
            count: z.number(),
          })
        ),
      })
    ),
  }),
});

export type GetJobSuccess = z.infer<typeof getJobSuccessSchema>;
