import { z } from "zod";

export const getTasksSuccessSchema = z.object({
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
      selfEmployed: z.boolean(),
      status: z.union([
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5),
      ]),
      user: z.object({
        id: z.number(),
        email: z.string(),
        logo: z.string(),
        phone: z.number(),
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
      orderActivities: z.array(
        z.object({
          viewActivity: z.object({
            id: z.number(),
            name: z.string(),
            detailName: z.string(),
            previewText: z.string(),
            logo: z.string(),
            traveling: z.boolean(),
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
      project: z.object({
        id: z.number(),
        name: z.string(),
        brand: z.array(
          z.object({
            id: z.number(),
            name: z.string(),
            logo: z.string(),
            description: z.string(),
          }),
        ),
      }),
      acceptUser: z.union([
        z.null(),
        z.object({
          id: z.number(),
          phone: z.number(),
          email: z.string(),
          logo: z.string(),
          roles: z.array(
            z.object({
              id: z.number(),
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
      acceptedUser: z.array(
        z.object({
          id: z.number(),
          phone: z.number(),
          email: z.string(),
          logo: z.string(),
          roles: z.array(
            z.object({
              id: z.number(),
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
    }),
  ),
  links: z
    .object({
      first: z.union([z.null(), z.string()]),
      last: z.union([z.null(), z.string()]),
      prev: z.union([z.null(), z.string()]),
      next: z.union([z.null(), z.string()]),
    })
    .optional(),
  meta: z
    .object({
      current_page: z.number(),
      from: z.number(),
      path: z.string(),
      per_page: z.number(),
      to: z.number(),
    })
    .optional(),
});

export type GetTasksSuccess = z.infer<typeof getTasksSuccessSchema>;
