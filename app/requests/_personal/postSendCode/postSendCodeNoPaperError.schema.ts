import { z } from "zod";

export const postSendCodeNoPaperErrorSchema = z.object({
  data: z.object({
    Name: z.string(),
    code: z.string(),
    description: z.string(),
    // customErrorValues: z.object(),
  }),
});

export type PostSendCodeNoPaperError = z.infer<
  typeof postSendCodeNoPaperErrorSchema
>;
