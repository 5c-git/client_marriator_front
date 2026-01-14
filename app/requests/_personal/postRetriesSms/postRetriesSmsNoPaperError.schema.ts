import { z } from "zod";

export const postRetriesSmsNoPaperErrorSchema = z.object({
  data: z.object({
    Name: z.string(),
    code: z.string(),
    description: z.string(),
    // customErrorValues: z.object(),
  }),
});

export type PostRetriesSmsNoPaperError = z.infer<
  typeof postRetriesSmsNoPaperErrorSchema
>;
