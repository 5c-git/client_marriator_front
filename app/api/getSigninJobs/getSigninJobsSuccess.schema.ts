import { z } from "zod";

export const getSigninJobsSuccessSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
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
          description: z.string()
        })
      }),
      price: z.number(),
      viewActivity: z.object({
        id: z.number(),
        name: z.string(),
        detailName: z.string(),
        previewText: z.string(),
        logo: z.string(),
        traveling: z.boolean(),
        standard: z.object({
          id: z.number(),
          name: z.string(),
          coefficient: z.number()
        })
      }),
      dateStart: z.string(),
      dateEnd: z.string(),
      project: z.union([z.object({
        id: z.number(),
        name: z.string(),
        dateStart: z.string(),
        dateEnd: z.string(),
        timeStart: z.string(),
        timeEnd: z.string(),
        brand: z.array(
          z.object({
            id: z.number(),
            name: z.string(),
            logo: z.string(),
            description: z.string()
          })
        )
      }), z.null()])
    })
  )
})

export type GetSigninJobsSuccess = z.infer<typeof getSigninJobsSuccessSchema>;
