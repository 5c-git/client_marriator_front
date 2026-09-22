import { z } from "zod";

export const getJobsSuccessSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      createdAt: z.string(),
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
      }),
      // radius: z.number(),
      price: z.number(),
      viewActivity: z.object({
        name: z.string(),
        detailName: z.string(),
        previewText: z.string(),
        logo: z.string(),
        standard: z.object({
          id: z.number(),
          coefficient: z.number(),
          name: z.string(),
        }),
      }),

      dateStart: z.string(),
      dateEnd: z.string(),

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
              "manager",
              "supervisor",
              "client",
              "specialist",
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
          z.literal(6),
        ]),
      }),
    }),
  ),
});

export type GetJobsSuccess = z.infer<typeof getJobsSuccessSchema>;
