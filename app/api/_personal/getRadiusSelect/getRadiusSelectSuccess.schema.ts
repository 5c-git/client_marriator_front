import { z } from "zod";

export const getRadiusSelectSuccessSchema = z.object({
  data: z.array(
    z.object({ id: z.number(), value: z.number(), default: z.boolean() }),
  ),
});

export type GetRadiusSelectSuccess = z.infer<
  typeof getRadiusSelectSuccessSchema
>;
