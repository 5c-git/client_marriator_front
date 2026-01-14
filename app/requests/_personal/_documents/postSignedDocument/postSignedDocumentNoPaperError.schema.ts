import { z } from "zod";

export const postSignedDocumentNoPaperErrorSchema = z.object({
  data: z.object({
    Name: z.string(),
    code: z.string(),
    description: z.string(),
    // customErrorValues: z.object(),
  }),
});

export type PostSignedDocumentNoPaperError = z.infer<
  typeof postSignedDocumentNoPaperErrorSchema
>;
