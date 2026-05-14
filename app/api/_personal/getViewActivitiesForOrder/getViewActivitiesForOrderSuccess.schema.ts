import { z } from "zod";

export const getViewActivitiesForOrderSuccessSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      detailName: z.string(),
      previewText: z.string(),
      logo: z.string(),
      traveling: z.boolean(),
    }),
  ),
});

export type GetViewActivitiesForOrderSuccess = z.infer<
  typeof getViewActivitiesForOrderSuccessSchema
>;
