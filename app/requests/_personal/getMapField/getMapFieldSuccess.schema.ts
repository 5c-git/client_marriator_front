import { z } from "zod";

export const getMapFieldSuccessSchema = z.object({
  result: z.object({
    mapAddress: z.string(),
    mapRadius: z.string(),
    latitude: z.union([z.null(), z.string()]),
    longitude: z.union([z.null(), z.string()]),
  }),
  status: z.literal("success"),
});

export type GetMapFieldSuccess = z.infer<typeof getMapFieldSuccessSchema>;
