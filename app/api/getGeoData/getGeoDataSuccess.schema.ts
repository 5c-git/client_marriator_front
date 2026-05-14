import { z } from "zod";

export const getGeoDataSuccessSchema = z.object({
  response: z.object({
    GeoObjectCollection: z.object({
      featureMember: z.array(
        z.object({
          GeoObject: z.object({
            metaDataProperty: z.object({
              GeocoderMetaData: z.object({ text: z.string() }),
            }),
            Point: z.object({ pos: z.string() }),
          }),
        }),
      ),
    }),
  }),
});

export type GetGeoDataSuccess = z.infer<typeof getGeoDataSuccessSchema>;
