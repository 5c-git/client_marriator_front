import { z } from "zod";

export const postSignedDocumentErrorSchema = z.object({
  data: z.object({ error: z.boolean() }),
});

export type PostSignedDocumentError = z.infer<
  typeof postSignedDocumentErrorSchema
>;
